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
import {
  selectSearchCategory,
  selectSearchIngredients,
} from '../../redux/filters/selectors';
import { getCategories } from '../../redux/categories/operations';
import { getIngredients } from '../../redux/ingredients/operations';
//import { selectAllRecipesTotalItems } from '../../redux/recipes/selectors';

export default function Filters() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const isLoadingCategories = useSelector(selectCategoriesIsLoading);
  const isLoadingIngredients = useSelector(selectIngredientsIsLoading);

  const selectedCategories = useSelector(selectSearchCategory);
  const selectedIngredients = useSelector(selectSearchIngredients);
  //const totalItems = useSelector(selectAllRecipesTotalItems);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: '179px',
      minHeight: '33px',
      borderRadius: '4px',
      border: '1px solid rgba(139, 137, 137, 0.5)',
      backgroundColor: 'var(--light-grey)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'var(--black)',
      },
      '&:focus': {
        borderColor: 'var(--black)',
        outline: 'none',
      },
    }),
    valueContainer: base => ({
      ...base,
      flexWrap: 'wrap',
      padding: '0 8px',
    }),
    dropdownIndicator: base => ({
      ...base,
      color: 'var(--black)',
      padding: '0 8px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const handleCategoriesChange = selected => {
    dispatch(changeSearchCategory(selected?.map(c => c.value) || []));
  };

  const handleIngredientsChange = selected => {
    dispatch(changeSearchIngredients(selected?.map(i => i.value) || []));
  };

  const handleReset = () => {
    dispatch(clearFilters());
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

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
        {/* <p className={styles.count}>
          <span>{totalItems}</span>
          <span> recipes</span>
        </p> */}
        <div className={styles.filtersWrapper}>
          <div className={styles.desktopFilters}>
            <div className={styles.rightSide}>
              <button onClick={handleReset} className={styles.reset}>
                Reset filters
              </button>
              <Select
                isMulti
                isClearable={false}
                isLoading={isLoadingCategories}
                options={categories.map(c => {
                  return {
                    value: c,
                    label: c,
                  };
                })}
                value={selectedCategories.map(c => ({ value: c, label: c }))}
                onChange={handleCategoriesChange}
                placeholder="Category"
                classNamePrefix="customSelect"
                styles={customStyles}
              />
              <Select
                isMulti
                isClearable={false}
                isLoading={isLoadingIngredients}
                options={ingredients.map(i => ({
                  value: i.id,
                  label: i.name,
                }))}
                value={selectedIngredients.map(i => ({
                  value: i.id,
                  label: i.name,
                }))}
                onChange={handleIngredientsChange}
                placeholder="Ingredient"
                classNamePrefix="customSelect"
                styles={customStyles}
              />
            </div>
          </div>
          <button
            className={styles.filtersToggle}
            onClick={() => setIsOpen(true)}
          >
            Filters
            <svg className={styles.icon} width="16" height="16">
              <use href="/icons.svg#icon-filter"></use>
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
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
              <div className={styles.modalBody}>
                <Select
                  isMulti
                  isClearable={false}
                  isLoading={isLoadingCategories}
                  options={categories.map(c => ({
                    value: c,
                    label: c,
                  }))}
                  value={selectedCategories.map(c => ({
                    value: c,
                    label: c,
                  }))}
                  onChange={handleCategoriesChange}
                  placeholder="Category"
                  classNamePrefix="customSelect"
                  styles={customStyles}
                />

                <Select
                  isMulti
                  isClearable={false}
                  isLoading={isLoadingIngredients}
                  options={ingredients.map(i => ({
                    value: i.id,
                    label: i.name,
                  }))}
                  value={selectedIngredients.map(i => ({
                    value: i.id,
                    label: i.name,
                  }))}
                  onChange={handleIngredientsChange}
                  placeholder="Ingredient"
                  classNamePrefix="customSelect"
                  styles={customStyles}
                />
              </div>
              <button onClick={handleReset} className={styles.reset}>
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
