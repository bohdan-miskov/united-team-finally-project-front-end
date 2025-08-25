import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import styles from './RecipesList.module.css';

import {
  getAllRecipes,
  getOwnRecipes,
  getFavoriteRecipes,
} from '../../redux/recipes/operations';
import { getCategories } from '../../redux/categories/operations';
import { getIngredients } from '../../redux/ingredients/operations';

import {
  selectAllRecipesItems,
  selectOwnRecipesItems,
  selectFavoriteRecipesItems,
  selectAllRecipesTotalItems,
  selectOwnRecipesTotalItems,
  selectFavoriteRecipesTotalItems,
  selectAllRecipesIsLoading,
  selectOwnRecipesIsLoading,
  selectFavoriteRecipesIsLoading,
} from '../../redux/recipes/selectors';

import {
  selectSearchQuery,
  selectSearchCategory,
  selectSearchIngredients,
} from '../../redux/filters/selectors';

export default function RecipesList({ recipeType }) {
  const dispatch = useDispatch();
  const type = recipeType || 'all';

  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategories = useSelector(selectSearchCategory);
  const selectedIngredients = useSelector(selectSearchIngredients);

  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const allItems = useSelector(selectAllRecipesItems);
  const ownItems = useSelector(selectOwnRecipesItems);
  const favItems = useSelector(selectFavoriteRecipesItems);

  const isLoadingAll = useSelector(selectAllRecipesIsLoading);
  const isLoadingOwn = useSelector(selectOwnRecipesIsLoading);
  const isLoadingFav = useSelector(selectFavoriteRecipesIsLoading);

  const totalAll = useSelector(selectAllRecipesTotalItems);
  const totalOwn = useSelector(selectOwnRecipesTotalItems);
  const totalFav = useSelector(selectFavoriteRecipesTotalItems);

  const items =
    type === 'own' ? ownItems : type === 'favorites' ? favItems : allItems;
  const isLoading =
    type === 'own'
      ? isLoadingOwn
      : type === 'favorites'
      ? isLoadingFav
      : isLoadingAll;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategories, selectedIngredients]);

  useEffect(() => {
    const filters = {
      query: debouncedSearch,
      categories: selectedCategories,
      ingredients: selectedIngredients,
    };
    if (type === 'all') dispatch(getAllRecipes({ page, filters }));
    if (type === 'own') dispatch(getOwnRecipes({ page, filters }));
    if (type === 'favorites') dispatch(getFavoriteRecipes({ page, filters }));
  }, [
    dispatch,
    type,
    page,
    debouncedSearch,
    selectedCategories,
    selectedIngredients,
  ]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const hasMore = items && items.length < totalItems;

  return (
    <>
      <p className={styles.recipeCounter}>{items?.length || 0} recipes</p>

      <ul className={styles.list}>
        {items?.map((recipe, idx) => (
          <li className={styles.item} key={`${recipe._id}-${idx}`}>
            <RecipeCard recipe={recipe} recipeType={type} />
          </li>
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}

      {!isLoading && (!items || items.length === 0) && type === 'favorites' && (
        <p>You haven't saved any recipes yet</p>
      )}
      {!isLoading && (!items || items.length === 0) && type === 'own' && (
        <p>You don't have any of your own recipes yet</p>
      )}
      {!isLoading && (!items || items.length === 0) && type === 'all' && (
        <p>No recipes found</p>
      )}

      <LoadMoreBtn
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        loading={isLoading}
      />
    </>
  );
}
