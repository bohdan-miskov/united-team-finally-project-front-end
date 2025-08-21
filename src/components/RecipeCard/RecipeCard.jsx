import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ recipe, isAuth = false }) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!isAuth) {
      setShowAuthModal(true);
      return;
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {/* Фото */}
      <div className={styles.imageWrapper}>
        <img src={recipe.image} alt={recipe.title} className={styles.image} />
      </div>

      {/* Контент */}
      <div className={styles.content}>
        {/* Назва */}
        <h3 className={styles.title}>{recipe.title}</h3>

        {/* Час */}
        <div className={styles.timeBox}>
          <svg
            className={styles.timeIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M12 6v6l4 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{recipe.cookingTime || "N/A"} min</span>
        </div>

        {/* Опис */}
        <p className={styles.description}>{recipe.description}</p>

        {/* Калорії */}
        <p className={styles.calories}>
          {recipe.calories ? `~${recipe.calories} cals` : "—"}
        </p>

        {/* Learn More + Bookmark */}
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
              isFavorite ? styles.active : ""
            }`}
          >
            <svg className={styles.bookmarkIcon}>
              <use xlinkHref="#icon-bookmark" />
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
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
              <button onClick={() => setShowAuthModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
