import React, { useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import styles from "./RecipesList.module.css";

// Мокові дані
const mockRecipes = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Recipe ${i + 1}`,
  description: "A tasty recipe example.",
  cookingTime: 15 + i,
  calories: 100 + i,
  image: "https://via.placeholder.com/150",
}));

export default function RecipesList({ recipes = mockRecipes }) {
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);

    // Костиль: імітуємо запит на бекенд
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setLoading(false);
    }, 1000);
  };

  const visibleRecipes = recipes.slice(0, visibleCount);

  return (
    <div className={styles.wrapper}>
      {/* Список карток */}
      <div className={styles.grid}>
        {visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} isAuth={true} />
        ))}
      </div>

      {/* Load More Btn */}
      <LoadMoreBtn
        onClick={handleLoadMore}
        isVisible={visibleCount < recipes.length}
        loading={loading}
      />
    </div>
  );
}
