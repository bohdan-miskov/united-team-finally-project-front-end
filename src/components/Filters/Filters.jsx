import React, { useState, useEffect } from "react";

const mockCategories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
const mockIngredients = ["Eggs", "Beef", "Mushrooms", "Cheese", "Vegetables"];

// Костиль: імітуємо запит на бекенд
const mockFetchRecipes = (filters, searchQuery) => {
  console.log("Запит на бекенд з параметрами:", { filters, searchQuery });
  // умовно повертаємо випадкову кількість рецептів
  return Math.floor(Math.random() * 20);
};

export default function Filters({ searchQuery }) {
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [recipesCount, setRecipesCount] = useState(0);

  // Викликаємо "бекенд" при зміні фільтрів
  useEffect(() => {
    const count = mockFetchRecipes({ category, ingredient }, searchQuery);
    setRecipesCount(count);
  }, [category, ingredient, searchQuery]);

  const handleReset = () => {
    setCategory("");
    setIngredient("");
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl shadow-md mb-6">
      <p className="text-lg font-semibold">{recipesCount} recipes found</p>

      <div className="flex items-center gap-4">
        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Category</option>
          {mockCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Ingredient */}
        <select
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Ingredient</option>
          {mockIngredients.map((ing) => (
            <option key={ing} value={ing}>
              {ing}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
