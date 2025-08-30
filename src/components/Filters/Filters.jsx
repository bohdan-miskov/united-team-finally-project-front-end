import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchCategories,
  changeSearchIngredients,
  changeSortParams,
  clearFilters,
  clearSortParams,
  resetAllSearchParams,
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
  selectSearchCategories,
  selectSearchIngredients,
  selectSortBy,
  selectSortOrder,
} from '../../redux/filters/selectors';
import { getCategories } from '../../redux/categories/operations';
import { getIngredients } from '../../redux/ingredients/operations';
import {
  selectAllRecipesTotalItems,
  selectFavoriteRecipesTotalItems,
  selectOwnRecipesTotalItems,
} from '../../redux/recipes/selectors';

export default function Filters({ recipeType = 'all' }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const modalRef = useRef(null);

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const isLoadingCategories = useSelector(selectCategoriesIsLoading);
  const isLoadingIngredients = useSelector(selectIngredientsIsLoading);

  const selectedCategories = useSelector(selectSearchCategories);
  const selectedIngredients = useSelector(selectSearchIngredients);

  const totalItems = useSelector(state => {
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

  const customStylesDesc = {
    control: base => ({
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
  const customStylesMob = {
    ...customStylesDesc,
    control: (base, state) => ({
      ...customStylesDesc.control(base, state),
      width: '100%',
    }),
  };

  const sortOptions = [
    { value: ['title', 'asc'], label: 'Title (A → Z)' },
    { value: ['title', 'desc'], label: 'Title (Z → A)' },
    { value: ['time', 'asc'], label: 'Time (Low → High)' },
    { value: ['cals', 'asc'], label: 'Calories (Low → High)' },
    { value: ['popularity', 'desc'], label: 'Popularity (High → Low)' },
    { value: ['createdAt', 'desc'], label: 'Created At (Newest First)' },
    { value: ['createdAt', 'asc'], label: 'Created At (Oldest First)' },
  ];

  const handleCategoriesChange = selected => {
    dispatch(changeSearchCategories(selected?.map(c => c.value) || []));
  };

  const handleIngredientsChange = selected => {
    dispatch(changeSearchIngredients(selected?.map(i => i.value) || []));
  };

  const handleReset = () => {
    dispatch(clearFilters());
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = e => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEsc);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    dispatch(resetAllSearchParams());
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
        <p className={styles.recipeCounter}>{`${totalItems} recipes`}</p>

        <div className={styles.filtersWrapper}>
          <div className={styles.desktopFilters}>
            <div className={styles.rightSide}>
              <button onClick={handleReset} className={styles.reset}>
                Reset filters
              </button>

              {/* Categories */}
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
                styles={customStylesDesc}
              />

              {/* Ingredients */}
              <Select
                isMulti
                isClearable={false}
                isLoading={isLoadingIngredients}
                options={ingredients.map(i => ({
                  value: i._id,
                  label: i.name,
                }))}
                value={selectedIngredients.map(id => ({
                  value: id,
                  label: ingredients.find(i => i._id === id)?.name || id,
                }))}
                onChange={handleIngredientsChange}
                placeholder="Ingredient"
                classNamePrefix="customSelect"
                styles={customStylesDesc}
              />

              {/* Sort */}
              <Select
                isClearable
                options={sortOptions}
                value={
                  sortBy && sortOrder
                    ? sortOptions.find(
                        o => o.value[0] === sortBy && o.value[1] === sortOrder
                      )
                    : null
                }
                onChange={option => {
                  if (!option) {
                    dispatch(clearSortParams());
                    return;
                  }
                  const [field, order] = option.value;
                  dispatch(
                    changeSortParams({
                      sortBy: field,
                      sortOrder: order,
                    })
                  );
                }}
                placeholder="Sort by"
                classNamePrefix="customSelect"
                styles={{
                  ...customStylesDesc,
                  control: (base, state) => ({
                    ...customStylesDesc.control(base, state),
                    width: '250px',
                  }),
                }}
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

        {
          <div
            className={`${styles.modalOverlay} ${isOpen ? styles.isOpen : ''}`}
          >
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
                {/* Categories */}
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
                  styles={customStylesMob}
                />

                {/* Ingredients */}
                <Select
                  isMulti
                  isClearable={false}
                  isLoading={isLoadingIngredients}
                  options={ingredients.map(i => ({
                    value: i._id,
                    label: i.name,
                  }))}
                  value={selectedIngredients.map(id => ({
                    value: id,
                    label: ingredients.find(i => i._id === id)?.name || id,
                  }))}
                  onChange={handleIngredientsChange}
                  placeholder="Ingredient"
                  classNamePrefix="customSelect"
                  styles={customStylesMob}
                />

                {/* Sort */}
                <Select
                  isClearable
                  options={sortOptions}
                  value={
                    sortBy && sortOrder
                      ? sortOptions.find(
                          o => o.value[0] === sortBy && o.value[1] === sortOrder
                        )
                      : null
                  }
                  onChange={option => {
                    if (!option) {
                      dispatch(clearSortParams());
                      return;
                    }
                    const [field, order] = option.value;
                    dispatch(
                      changeSortParams({
                        sortBy: field,
                        sortOrder: order,
                      })
                    );
                  }}
                  placeholder="Sort by"
                  classNamePrefix="customSelect"
                  styles={customStylesMob}
                />
              </div>
              <button onClick={handleReset} className={styles.reset}>
                Reset filters
              </button>
            </div>
          </div>
        }
      </div>
    </>
  );
}
