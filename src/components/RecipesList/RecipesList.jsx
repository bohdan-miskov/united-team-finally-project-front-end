import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
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

  const items =
    type === 'own' ? ownItems : type === 'favorites' ? favItems : allItems;

  const isLoading =
    type === 'own' ? isLoadingOwn : type === 'favorites' ? isLoadingFav : isLoadingAll;

  useEffect(() => {
    if (!items || items.length === 0) {
      if (type === 'all') dispatch(getAllRecipes(1));
      if (type === 'own') dispatch(getOwnRecipes(1));
      if (type === 'favorites') dispatch(getFavoriteRecipes(1));
    }
  }, [dispatch, type, items]);

  return (
    <>
      <p className={styles.recipeCounter}>{items?.length || 0} recipes</p>

      <div className={styles.list}>
        {items?.map((recipe, idx) => (
          <RecipeCard
            key={`${recipe._id}-${idx}`}          
            recipe={recipe}
            recipeType={type}
          />
        ))}

        {isLoading && <p>Loading...</p>}

        {!isLoading && (!items || items.length === 0) && type === 'favorites' && (
          <p>You haven't saved any recipes yet</p>
        )}
        {!isLoading && (!items || items.length === 0) && type === 'own' && (
          <p>You don't have any of your own recipes yet</p>
        )}
      </div>
    </>
  );
}