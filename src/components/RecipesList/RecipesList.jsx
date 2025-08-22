import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Filters from "../Filters/Filters";
import styles from "./RecipesList.module.css";

const mockRecipes = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Recipe ${i + 1}`,
  description: "A tasty recipe example.",
  cookingTime: 15 + i,
  calories: 100 + i,
  image: "https://via.placeholder.com/150",
}));

const mockFetchRecipes = (filters) => {
  console.log("Фільтри для запиту:", filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockRecipes;
      if (filters.categories?.length) {
        filtered = filtered.filter((r) =>
          filters.categories.some((c) =>
            r.title.toLowerCase().includes(c.value.toLowerCase())
          )
        );
      }
      if (filters.ingredients?.length) {
        filtered = filtered.filter((r) =>
          filters.ingredients.some((i) =>
            r.description.toLowerCase().includes(i.value.toLowerCase())
          )
        );
      }
      resolve(filtered);
    }, 500);
  });
};

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ categories: [], ingredients: [] });

  useEffect(() => {
    setLoading(true);
    mockFetchRecipes(filters).then((data) => {
      setRecipes(data);
      setVisibleCount(12);
      setLoading(false);
    });
  }, [filters]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setLoading(false);
    }, 1000);
  };

  const visibleRecipes = recipes.slice(0, visibleCount);

  return (
    <div className="container">
      {/* Передаємо кількість рецептів як властивість */}
      <Filters onChange={setFilters} recipeCount={recipes.length} />
      {recipes.length === 0 && !loading ? (
        <div className={styles.noResults}>No recipes found</div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} isAuth={true} />
            ))}
          </div>

          <LoadMoreBtn
            onClick={handleLoadMore}
            isVisible={visibleCount < recipes.length}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
