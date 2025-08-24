import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/recipes/operations';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import styles from './RecipesList.module.css';

export default function RecipesList() {
  const dispatch = useDispatch();

  const recipes = useSelector(state => state.recipes.all.items);
  const totalItems = useSelector(state => state.recipes.all.totalItems);
  const loading = useSelector(state => state.recipes.all.loading);
  const page = useSelector(state => state.recipes.all.page);
  const filters = useSelector(state => state.filters);

  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    dispatch(getAllRecipes({ page: 1, limit: 12, ...filters }));
    setVisibleCount(12);
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    dispatch(getAllRecipes({ page: page + 1, limit: 12, ...filters }));
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div className="container">
      {recipes.length === 0 && !loading ? (
        <div className={styles.noResults}>No recipes found</div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            {recipes.slice(0, visibleCount).map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} isAuth={true} />
            ))}
          </div>

          <LoadMoreBtn
            onClick={handleLoadMore}
            isVisible={visibleCount < totalItems}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
