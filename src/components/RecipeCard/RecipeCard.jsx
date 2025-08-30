import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import {
  addRecipeToFavorite,
  deleteRecipeFromFavorite,
} from '../../redux/recipes/operations';
import { selectUserProfile } from '../../redux/user/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useMediaQuery } from 'react-responsive';

export default function RecipeCard({ recipe, recipeType, openModal }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });

  const favItems = useSelector(selectUserProfile)?.favourites;

  const {
    _id,
    title,
    description,
    time,
    calories = '~ N/A',
    thumb,
  } = recipe || {};

  const imgSrc = thumb;

  const type = (recipeType || '').trim().toLowerCase();
  const isAll = type === 'all';
  const isFavorites = type === 'favorites';

  const isSaved =
    isFavorites || (Array.isArray(favItems) && favItems.some(r => r === _id));

  const handleBookmark = () => {
    if (!_id) return;

    if (isSaved) {
      dispatch(deleteRecipeFromFavorite(_id));
    } else {
      dispatch(addRecipeToFavorite(_id));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.defaultImg}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className={styles.image}
            width={isMobile ? 337 : isTablet ? 315 : 264}
            height={isMobile ? 230 : isTablet ? 230 : 178}
          />
        ) : (
          <svg className={styles.iconPhoto} width={48} height={48}>
            <use href={'/icons.svg#icon-photo'} />
          </svg>
        )}
      </div>

      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.timeBadge} title="Cooking time">
          <svg className={styles.iconClock}>
            <use href={'/icons.svg#icon-clock'} />
          </svg>
          <span>{time}</span>
        </div>
      </div>

      <div className={styles.descriptionContainer}>
        <p>{description}</p>
        <p>{calories}</p>
      </div>

      <div className={styles.btnContainer}>
        <Link
          className={`${styles.learnMoreBtn} dark-outline-btn`}
          to={`/recipes/${_id}`}
        >
          Learn more
        </Link>

        {(isAll || isFavorites) && (
          <button
            type="button"
            onClick={() => {
              !isLoggedIn ? openModal() : handleBookmark();
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
            className={`${styles.bookmarkBtn} ${
              isAll ? (isSaved ? 'brown-btn' : 'dark-outline-btn') : 'brown-btn'
            }`}
          >
            <svg className={styles.iconSave}>
              <use href={'/icons.svg#icon-save-to-list'} />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
