import { useNavigate } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import sprite from '../../../public/icons.svg';

const fallbackImg =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60';

export default function RecipeCard({
  recipe,
  recipeType, 
  onBookmark,
  onDelete,
}) {
  const navigate = useNavigate();
  const { id, title, description, time, calories, image, isFavorite } = recipe;

  const isAll = recipeType === 'all';
  const isOwn = recipeType === 'own';
  const isFavorites = recipeType === 'favorites';

  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={title}
        className={styles.image}
        onError={(e) => {
          e.currentTarget.src = fallbackImg;
        }}
      />

      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.timeBadge} title="Cooking time">
          <svg className={styles.iconClock}>
            <use href={`${sprite}#icon-clock`} />
          </svg>
          <span>{time}</span>
        </div>
      </div>

      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
        <p>{calories}</p>
      </div>

      <div className={styles.btnContainer}>
        <button
          className={styles.learnMoreBtn}
          onClick={() => navigate(`/recipes/${id}`)}
        >
          Learn more
        </button>

        {(isAll || isFavorites) && (
          <button
            type="button"
            onClick={() => onBookmark?.(id, isFavorite)}
            aria-label={isFavorite ? 'Unsave recipe' : 'Save recipe'}
            className={`${styles.bookmarkBtn} ${
              isFavorite ? styles.bookmarkActive : ''
            }`}
          >
            <svg className={styles.iconSave}>
              <use href={`${sprite}#icon-save-to-list`} />
            </svg>
          </button>
        )}

        {isOwn && (
          <button
            type="button"
            onClick={() => onDelete?.(id)}
            aria-label="Delete my recipe"
            className={styles.deleteBtn}
          >
            <svg className={styles.iconDelete}>
              <use href={`${sprite}#icon-delete`} />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
