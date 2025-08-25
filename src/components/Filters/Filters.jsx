import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchCategory,
  changeSearchIngredients,
  clearFilters,
} from '../../redux/filters/slice';

import {
  selectCategories,
  selectCategoriesIsLoading,
} from '../../redux/categories/selectors';
import {
  selectIngredients,
  selectIngredientsIsLoading,
} from '../../redux/ingredients/selectors';

import { selectAllRecipesItems } from '../../redux/recipes/selectors';

export default function Filters() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const isLoadingCategories = useSelector(selectCategoriesIsLoading);
  const isLoadingIngredients = useSelector(selectIngredientsIsLoading);

  const selectedCategories = useSelector(state => state.filters.category);
  const selectedIngredients = useSelector(state => state.filters.ingredients);
  const searchQuery = useSelector(state => state.filters.searchQuery);

  const allItems = useSelector(selectAllRecipesItems);

  const filteredItems = allItems.filter(r => {
    const matchesSearch = r.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(r.category);

    const matchesIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every(i => r.ingredients.some(ing => ing.name === i));

    return matchesSearch && matchesCategory && matchesIngredients;
  });

  const totalFiltered = filteredItems.length;

  const handleCategoriesChange = selected => {
    dispatch(changeSearchCategory(selected?.map(c => c.value) || []));
  };

  const handleIngredientsChange = selected => {
    dispatch(changeSearchIngredients(selected?.map(i => i.value) || []));
  };

  const handleReset = () => {
    dispatch(clearFilters());
  };

  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className={styles.filtersSection}>
        {/* Left side: recipes count */}
        <p className={styles.count}>
          <span>{totalFiltered}</span>
          <span>recipes</span>
        </p>

        {/* Filters */}
        <div className={styles.dropdownWrapper}>
          {/* Button (only visible on mobile/tablet) */}
          <button
            className={styles.filtersToggle}
            onClick={() => setIsOpen(true)}
          >
            Filters
            <svg className={styles.icon} width="16" height="16">
              <use href="/icons.svg#icon-filter"></use>
            </svg>
          </button>

          {/* Modal window (mobile/tablet) */}
          {isOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent} ref={modalRef}>
                {/* Header */}
                <div className={styles.modalHeader}>
                  <span className={styles.modalTitle}>Filters</span>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    <svg width="24" height="24">
                      <use href="/icons.svg#icon-close-circle"></use>
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className={styles.modalBody}>
                  <Select
                    isMulti
                    isLoading={isLoadingCategories}
                    options={categories.map(c => ({
                      value: c.name,
                      label: c.name,
                    }))}
                    value={selectedCategories.map(c => ({
                      value: c,
                      label: c,
                    }))}
                    onChange={handleCategoriesChange}
                    placeholder="Category"
                    classNamePrefix="customSelect"
                  />

                  <Select
                    isMulti
                    isLoading={isLoadingIngredients}
                    options={ingredients.map(i => ({
                      value: i.name,
                      label: i.name,
                    }))}
                    value={selectedIngredients.map(i => ({
                      value: i,
                      label: i,
                    }))}
                    onChange={handleIngredientsChange}
                    placeholder="Ingredient"
                    classNamePrefix="customSelect"
                  />
                  <button onClick={handleReset} className={styles.reset}>
                    Reset filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop filters */}
          <div className={styles.desktopFilters}>
            <button onClick={handleReset} className={styles.reset}>
              Reset filters
            </button>

            <Select
              isMulti
              isLoading={isLoadingCategories}
              options={categories.map(c => ({
                value: c.name,
                label: c.name,
              }))}
              value={selectedCategories.map(c => ({ value: c, label: c }))}
              onChange={handleCategoriesChange}
              placeholder="Category"
              classNamePrefix="customSelect"
            />

            <Select
              isMulti
              isLoading={isLoadingIngredients}
              options={ingredients.map(i => ({
                value: i.name,
                label: i.name,
              }))}
              value={selectedIngredients.map(i => ({ value: i, label: i }))}
              onChange={handleIngredientsChange}
              placeholder="Ingredient"
              classNamePrefix="customSelect"
            />
          </div>
        </div>
      </div>
    </>
  );
}
