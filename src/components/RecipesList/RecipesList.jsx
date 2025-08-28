import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import styles from './RecipesList.module.css';

import {
  getAllRecipes,
  getOwnRecipes,
  getFavoriteRecipes,
} from '../../redux/recipes/operations';

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
  selectOwnRecipesHasNextPage,
  selectAllRecipesHasNextPage,
  selectFavoriteRecipesHasNextPage,
  selectOwnRecipesError,
  selectAllRecipesError,
  selectFavoriteRecipesError,
} from '../../redux/recipes/selectors';
import {
  selectSearchCategory,
  selectSearchIngredients,
  selectSearchQuery,
} from '../../redux/filters/selectors.js';
import { useDebounce } from 'use-debounce';

export default function RecipesList({ recipeType }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const items = useSelector(state => {
    switch (recipeType) {
      case 'own':
        return selectOwnRecipesItems(state);
      case 'favorites':
        return selectFavoriteRecipesItems(state);
      case 'all':
        return selectAllRecipesItems(state);
      default:
        return [];
    }
  });

  const total = useSelector(state => {
    switch (recipeType) {
      case 'own':
        return selectOwnRecipesTotalItems(state);
      case 'favorites':
        return selectFavoriteRecipesTotalItems(state);
      case 'all':
        return selectAllRecipesTotalItems(state);
      default:
        return 0;
    }
  });

  const isLoading = useSelector(state => {
    switch (recipeType) {
      case 'own':
        return selectOwnRecipesIsLoading(state);
      case 'favorites':
        return selectFavoriteRecipesIsLoading(state);
      case 'all':
        return selectAllRecipesIsLoading(state);
      default:
        return 0;
    }
  });

  const error = useSelector(state => {
    switch (recipeType) {
      case 'own':
        return selectOwnRecipesError(state);
      case 'favorites':
        return selectFavoriteRecipesError(state);
      case 'all':
        return selectAllRecipesError(state);
      default:
        return 0;
    }
  });

  const hasNextPage = useSelector(state => {
    switch (recipeType) {
      case 'own':
        return selectOwnRecipesHasNextPage(state);
      case 'favorites':
        return selectFavoriteRecipesHasNextPage(state);
      case 'all':
        return selectAllRecipesHasNextPage(state);
      default:
        return false;
    }
  });

  const searchQuery = useSelector(selectSearchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const selectedCategories = useSelector(selectSearchCategory);
  const selectedIngredients = useSelector(selectSearchIngredients);

  useEffect(() => {
    if (recipeType === 'all') {
      setPage(1);
    }
  }, [
    debouncedSearchQuery,
    selectedCategories,
    selectedIngredients,
    recipeType,
  ]);

  useEffect(() => {
    if (recipeType === 'all') {
      dispatch(
        getAllRecipes({
          page,
          query: debouncedSearchQuery,
          categories: selectedCategories,
          ingredients: selectedIngredients,
        })
      );
    }
    if (recipeType === 'own') {
      dispatch(getOwnRecipes({ page }));
    }
    if (recipeType === 'favorites') {
      dispatch(getFavoriteRecipes({ page }));
    }
  }, [
    dispatch,
    recipeType,
    page,
    debouncedSearchQuery,
    selectedCategories,
    selectedIngredients,
  ]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const isEmpty = !isLoading && (!items || items.length === 0);

  const emptyMessages = {
    favorites: "You haven't saved any recipes yet",
    own: "You don't have any of your own recipes yet",
    all: 'No recipes found',
  };

  return (
    <>
      <p className={styles.recipeCounter}>{total || 0} recipes</p>

      <ul className={styles.list}>
        {items?.map((recipe, idx) => (
          <li className={styles.item} key={`${recipe._id}-${idx}`}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>
        ))}
      </ul>

      {isLoading && !error && <p>Loading...</p>}

      {isEmpty && emptyMessages[recipeType] && (
        <p>{emptyMessages[recipeType]}</p>
      )}

      <LoadMoreBtn
        onLoadMore={handleLoadMore}
        hasMore={hasNextPage}
        loading={isLoading}
      />
    </>
  );
}
