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
  selectAllRecipesIsLoading,
  selectOwnRecipesIsLoading,
  selectFavoriteRecipesIsLoading,
} from '../../redux/recipes/selectors';

export default function RecipesList({ recipeType }) {
  const dispatch = useDispatch();
  const type = recipeType || 'all';

  const allItems = useSelector(selectAllRecipesItems);
  const ownItems = useSelector(selectOwnRecipesItems);
  const favItems = useSelector(selectFavoriteRecipesItems);

  const isLoadingAll = useSelector(selectAllRecipesIsLoading);
  const isLoadingOwn = useSelector(selectOwnRecipesIsLoading);
  const isLoadingFav = useSelector(selectFavoriteRecipesIsLoading);

  const searchQuery = useSelector(state => state.filters.searchQuery);

  const items =
    type === 'own' ? ownItems : type === 'favorites' ? favItems : allItems;

  const isLoading =
    type === 'own'
      ? isLoadingOwn
      : type === 'favorites'
      ? isLoadingFav
      : isLoadingAll;

  useEffect(() => {
    if (!items || items.length === 0) {
      if (type === 'all') dispatch(getAllRecipes(1));
      if (type === 'own') dispatch(getOwnRecipes(1));
      if (type === 'favorites') dispatch(getFavoriteRecipes(1));
    }
  }, [dispatch, type, items]);

  const filteredItems = items?.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [visibleCount, setVisibleCount] = useState(12);
  const visibleItems = filteredItems?.slice(0, visibleCount);

  const hasMore = filteredItems && visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <>
      <ul className={styles.list}>
        {visibleItems?.map((recipe, idx) => (
          <li className={styles.item} key={`${recipe._id}-${idx}`}>
            <RecipeCard recipe={recipe} recipeType={type} />
          </li>
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}

      {!isLoading && (!visibleItems || visibleItems.length === 0) && (
        <p>No recipes found</p>
      )}

      {/* 🔹 додаю кнопку */}
      <LoadMoreBtn
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        loading={isLoading}
      />
    </>
  );
}
