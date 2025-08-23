import { useEffect, useMemo, useState } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import styles from './RecipesList.module.css';
import { allRecipes, ownRecipes, savedRecipes } from '../../mock/recipes.js';


export default function RecipesList({
  recipeType = 'all',
  isAuthorized = true,
}) {
  const source = useMemo(() => {
    switch (recipeType) {
      case 'own':
        return ownRecipes;
      case 'favorites':
        return savedRecipes;
      case 'all':
      default:
        return allRecipes;
    }
  }, [recipeType]);

  const [list, setList] = useState(source);
  useEffect(() => {
    setList(source);
  }, [source]);

  const handleBookmark = (id, isFavoriteNow) => {
    if (recipeType === 'all' && !isAuthorized) {
      alert('Error while saving. Please log in.');
      return;
    }
    setList((prev) =>
      recipeType === 'favorites'
        ? prev.filter((r) => r.id !== id)
        : prev.map((r) =>
            r.id === id ? { ...r, isFavorite: !isFavoriteNow } : r
          )
    );
  };

  const handleDelete = (id) => {
    setList((prev) => prev.filter((r) => r.id !== id));
  };

  const RecipeCounter = ({ total }) => (
    <p className={styles.recipeCounter}>{total} recipes</p>
  );

  return (
    <>
      <RecipeCounter total={list.length} />
      <div className={styles.list}>
        {list.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            recipeType={recipeType}
            onBookmark={handleBookmark}
            onDelete={handleDelete}
          />
        ))}

        <LoadMoreBtn />

        {!list.length && recipeType === 'favorites' && (
          <p>You haven't saved any recipes yet</p>
        )}
        {!list.length && recipeType === 'own' && (
          <p>You don't have any of yor own recipes yet</p>
        )}
      </div>
    </>
  );
}
