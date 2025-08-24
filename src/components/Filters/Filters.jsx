import Select from 'react-select';
import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchCategory,
  changeSearchIngredients,
  clearFilters,
} from '../../redux/filters/slice';

export default function Filters() {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.recipes.all.totalItems);
  const categories = useSelector(state => state.filters.category);
  const ingredients = useSelector(state => state.filters.ingredients);

  const handleCategoriesChange = selected => {
    dispatch(changeSearchCategory(selected?.map(c => c.value) || []));
  };

  const handleIngredientsChange = selected => {
    dispatch(changeSearchIngredients(selected?.map(i => i.value) || []));
  };

  const handleReset = () => {
    dispatch(clearFilters());
  };

  return (
    <div>
      <h2 className={styles.title}>Recipes</h2>
      <div className={styles.filtersSection}>
        <p className={styles.count}>{totalItems} recipes</p>
        <div className={styles.filters}>
          <button onClick={handleReset} className={styles.reset}>
            Reset filters
          </button>

          <Select
            isMulti
            options={['Breakfast', 'Lunch', 'Dinner', 'Dessert'].map(c => ({
              value: c,
              label: c,
            }))}
            value={categories.map(c => ({ value: c, label: c }))}
            onChange={handleCategoriesChange}
            placeholder="Category"
            classNamePrefix="customSelect"
          />

          <Select
            isMulti
            options={['Eggs', 'Beef', 'Mushrooms', 'Cheese', 'Vegetables'].map(
              i => ({ value: i, label: i })
            )}
            value={ingredients.map(i => ({ value: i, label: i }))}
            onChange={handleIngredientsChange}
            placeholder="Ingredient"
            classNamePrefix="customSelect"
          />
        </div>
      </div>
    </div>
  );
}
