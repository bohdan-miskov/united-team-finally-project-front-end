import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
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
  selectOwnRecipesError,
  selectAllRecipesError,
  selectFavoriteRecipesError,
  selectOwnRecipesTotalPages,
  selectFavoriteRecipesTotalPages,
  selectAllRecipesTotalPages,
} from '../../redux/recipes/selectors';
import {
  selectSearchCategories,
  selectSearchIngredients,
  selectSearchQuery,
  selectSortBy,
  selectSortOrder,
} from '../../redux/filters/selectors.js';
import { useDebounce } from 'use-debounce';
import Loader from '../Loader/Loader.jsx';
import AuthenticateModal from '../AuthenticateModal/AuthenticateModal.jsx';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage.jsx';
import { ERROR_MESSAGES } from '../../constants/index.js';
import NotFoundRecipes from '../NotFoundRecipes/NotFoundRecipes.jsx';

export default function RecipesList({ recipeType }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const [authModalIsOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const errorMessages = {
    ...ERROR_MESSAGES,
    404: 'Recipes are not found. Please try again later.',
  };

  const recipesListRef = useRef();

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

  const totalPages = useSelector(state => {
    switch (recipeType) {
      case 'own':
        return selectOwnRecipesTotalPages(state);
      case 'favorites':
        return selectFavoriteRecipesTotalPages(state);
      case 'all':
        return selectAllRecipesTotalPages(state);
      default:
        return false;
    }
  });

  const searchQuery = useSelector(selectSearchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 600);
  const selectedCategories = useSelector(selectSearchCategories);
  const selectedIngredients = useSelector(selectSearchIngredients);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearchQuery,
    selectedCategories,
    selectedIngredients,
    sortBy,
    sortOrder,
  ]);
  useEffect(() => {
    if (recipeType === 'all') {
      dispatch(getAllRecipes(page));
    }
    if (recipeType === 'own') {
      dispatch(getOwnRecipes(page));
    }
    if (recipeType === 'favorites') {
      dispatch(getFavoriteRecipes(page));
    }

    if (recipesListRef.current) {
      const newTop = recipesListRef.current.offsetTop - 140;
      if (newTop < window.scrollY) {
        window.scrollTo({
          top: newTop,
          behavior: 'smooth',
        });
      }
    }
  }, [
    dispatch,
    recipeType,
    page,
    debouncedSearchQuery,
    selectedCategories,
    selectedIngredients,
    sortBy,
    sortOrder,
  ]);

  const isEmpty = !isLoading && (!items || items.length === 0);

  const emptyMessages = {
    favorites: "You haven't saved any recipes yet",
    own: "You don't have any of your own recipes yet",
    all: 'No recipes found',
  };

  const goToPage = p => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
  };

  return (
    <>
      {isLoading && !error && <Loader />}
      <ul className={styles.list} ref={recipesListRef}>
        {items?.map((recipe, idx) => (
          <li className={styles.item} key={`${recipe._id}-${idx}`}>
            <RecipeCard
              recipe={recipe}
              recipeType={recipeType}
              openModal={openAuthModal}
            />
          </li>
        ))}
      </ul>

      {isEmpty && emptyMessages[recipeType] && <NotFoundRecipes />}

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
      <AuthenticateModal
        isOpen={authModalIsOpen}
        onClose={() => closeAuthModal()}
        title="Error while saving"
        content="To save this recipe, you need to authorize first"
      />
      {error && (
        <ErrorToastMessage>
          {errorMessages[error.status] ??
            'Failed to load ingredients. Please retry in a moment'}
        </ErrorToastMessage>
      )}
    </>
  );
}
