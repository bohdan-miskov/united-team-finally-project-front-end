import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { ERROR_MESSAGES } from '../../constants';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import {
  addRecipeToFavorite,
  deleteRecipeFromFavorite,
} from '../../redux/recipes/operations';
import { selectRecipesOperationIsLoading } from '../../redux/recipes/selectors';
import { selectUserProfile } from '../../redux/user/selectors';
import AuthenticateModal from '../AuthenticateModal/AuthenticateModal';
import BaseModal from '../BaseModal/BaseModal';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import IngredientsListModal from '../IngredientsListModal/IngredientsListModal';
import css from './RecipeDetails.module.css';

export default function RecipeDetails({ recipe }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });
  const isLoading = useSelector(selectRecipesOperationIsLoading);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favItems = useSelector(selectUserProfile)?.favourites;

  const isSaved =
    Array.isArray(favItems) && favItems.some(r => r === recipe._id);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const [ingreientsListModalOpen, setIngreientsListModalOpen] = useState(false);
  const openIngreientsListModal = useCallback(
    () => setIngreientsListModalOpen(true),
    []
  );
  const closeIngreientsListModal = useCallback(
    () => setIngreientsListModalOpen(false),
    []
  );

  const handleBookmark = async () => {
    if (!recipe._id) return;
    setErrorMessage(null);

    try {
      if (isSaved) {
        await dispatch(deleteRecipeFromFavorite(recipe._id)).unwrap();
      } else {
        await dispatch(addRecipeToFavorite(recipe._id)).unwrap();
      }
    } catch (err) {
      setErrorMessage(
        ERROR_MESSAGES[err.status] ??
          'Failed to update favorite recipes. Please try again later.'
      );
    }
  };
  
  return (
    <>
      <section>
        <div className="container">
          {isTabletOrDesktop && <h1 className={css.header}>{recipe.title}</h1>}
          <div className={css.imgContainer}>
            {isMobile &&
              (recipe.thumb ? (
                <img
                  className={css.img}
                  src={recipe.thumb}
                  alt={recipe.title}
                  loading="lazy"
                  decoding="async"
                  width={361}
                  height={276}
                />
              ) : (
                <div className={css.defaultImg}>
                  <svg className={css.iconPhoto} width={80} height={80}>
                    <use href={'/icons.svg#icon-photo'} />
                  </svg>
                </div>
              ))}
            {isTabletOrDesktop &&
              (recipe.thumb ? (
                <img
                  className={css.img}
                  src={recipe.thumb}
                  alt={recipe.title}
                  loading="lazy"
                  decoding="async"
                  width={704}
                  height={624}
                />
              ) : (
                <div className={css.defaultImg}>
                  <svg className={css.iconPhoto} width={140} height={140}>
                    <use href={'/icons.svg#icon-photo'} />
                  </svg>
                </div>
              ))}
          </div>
          {isMobile && <h1 className={css.header}>{recipe.title}</h1>}
          <div className={css.desktopWrapper}>
            <div className={css.tabletWrapper}>
              <div className={css.wrapper}>
                <h3 className={css.infoHeader}>General informations</h3>
                <ul className={css.generalList}>
                  <li>
                    <p>
                      <strong>Category: </strong>
                      {recipe.category}
                    </p>
                  </li>
                  {recipe.area && (
                    <li>
                      <p>
                        <strong>Area: </strong>
                        {recipe.area}
                      </p>
                    </li>
                  )}
                  <li>
                    <p>
                      <strong>Cooking time: </strong>
                      {recipe.time} minutes
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Caloric content: </strong>Approximately{' '}
                      {recipe.cals} kcal per serving
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Popularity: </strong>
                      {recipe.popularity ?? 0}
                    </p>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                disabled={isLoading}
                className={`${css.button} brown-btn`}
                onClick={() => {
                  !isLoggedIn ? openAuthModal() : handleBookmark();
                }}
              >
                {!isSaved ? 'Save' : 'Unsave'}
                <svg
                  className={!isSaved ? `${css.icon}` : `${css.iconSaved}`}
                  width={24}
                  height={24}
                >
                  <use href="/icons.svg#icon-save-to-list"></use>
                </svg>
              </button>
            </div>
            <ul className={css.contentList}>
              <li>
                <h2 className={css.h2}>About recipe</h2>
                <p>{recipe.description}</p>
              </li>
              <li>
                <h2 className={css.h2}>Ingredients:</h2>
                <ul className={css.ingredientsList}>
                  {recipe.ingredients.map((ingredient, idx) => {
                    return (
                      <li key={ingredient._id || idx}>
                        • {ingredient.name} — {ingredient.measure} {ingredient.unit}
                      </li>
                    );
                  })}
                </ul>
                <div className={css.btnContainer}>
                  <button
                    type="button"
                    className={`brown-btn ${css.button} ${css.btn}`}
                    onClick={e => {
                      openIngreientsListModal();
                      e.currentTarget.blur();
                    }}
                  >
                    Get list of ingredients
                  </button>
                </div>
              </li>
              <li>
                <h2 className={css.prepHeader}>Preparation Steps:</h2>
                <p>{recipe.instructions}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <AuthenticateModal
        isOpen={authModalOpen}
        onClose={() => closeAuthModal()}
        title="Error while saving"
        content="To save this recipe, you need to authorize first"
      />
      <BaseModal
        isOpen={ingreientsListModalOpen}
        onClose={() => closeIngreientsListModal()}
      >
        <IngredientsListModal recipe={recipe} onClose={() => closeIngreientsListModal()}/>
      </BaseModal>
      {isLoading && <FullScreenLoader text={'Just a moment...'} />}
      {errorMessage && <ErrorToastMessage>{errorMessage}</ErrorToastMessage>}
    </>
  );
}
