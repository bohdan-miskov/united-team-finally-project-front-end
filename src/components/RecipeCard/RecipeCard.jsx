import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addRecipeToFavorite,
  deleteRecipeFromFavorite,
} from '../../redux/recipes/operations';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(state => state.auth.isLoggedIn);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      setShowAuthModal(true);
      return;
    }

    if (recipe.isFavorite) {
      dispatch(deleteRecipeFromFavorite(recipe.id));
    } else {
      dispatch(addRecipeToFavorite(recipe.id));
    }
  };

  return (
    <div className={styles.card}>
      {/* Фото */}
      <div className={styles.imageWrapper}>
        <img src={recipe.image} alt={recipe.title} className={styles.image} />
      </div>

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.top}>
          <h3 className={styles.title}>{recipe.title}</h3>

          <div className={styles.timeBox}>
            <svg className={styles.timeIcon}>
              <use href="/icons.svg#icon-clock" />
            </svg>
            <span>{recipe.cookingTime || 'N/A'}</span>
          </div>
        </div>

        <p className={styles.description}>{recipe.description}</p>

        <p className={styles.calories}>
          {recipe.calories ? `~${recipe.calories} cals` : '—'}
        </p>

        <div className={styles.actions}>
          <button
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            className={styles.learnMoreBtn}
          >
            Learn more
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`${styles.bookmarkBtn} ${
              recipe.isFavorite ? styles.active : ''
            }`}
          >
            <svg className={styles.bookmarkIcon}>
              <use href="/icons.svg#icon-bookmark" />
            </svg>
          </button>
        </div>
      </div>

      {/* Модалка */}
      {showAuthModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>You need to log in</h2>
            <p>To add recipes to favorites, please log in or register.</p>
            <div className={styles.modalActions}>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/register')}>Register</button>
              <button onClick={() => setShowAuthModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
