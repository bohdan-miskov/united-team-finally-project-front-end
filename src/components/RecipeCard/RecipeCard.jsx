import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import {
  addRecipeToFavorite,
  deleteRecipeFromFavorite,
} from '../../redux/recipes/operations';
import { selectUserProfile } from '../../redux/user/selectors';

export default function RecipeCard({ recipe, recipeType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const isOwn = type === 'own';
  const isFavorites = type === 'favorites';

  const isSaved =
    isFavorites ||
    (Array.isArray(favItems) && favItems.some(r => r?._id === _id));

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
      {imgSrc ? (
        <img src={imgSrc} alt={title} className={styles.image} />
      ) : (
        <div className={styles.defaultImg}>
          <svg className={styles.iconPhoto} width={48} height={48}>
            <use href={'/icons.svg#icon-photo'} />
          </svg>
        </div>
      )}

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
        <button
          className={`${styles.learnMoreBtn} outline-btn`}
          onClick={() => navigate(`/recipes/${_id}`)}
        >
          Learn more
        </button>

        {(isAll || isFavorites) && (
          <button
            type="button"
            onClick={handleBookmark}
            aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
            className={`${styles.bookmarkBtn} ${
              isAll ? (isSaved ? 'brown-btn' : 'outline-btn') : 'brown-btn'
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
