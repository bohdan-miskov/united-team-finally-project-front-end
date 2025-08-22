import React, { useState } from "react";
import Select from "react-select";
import styles from "./Filters.module.css";

const mockCategories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
const mockIngredients = ["Eggs", "Beef", "Mushrooms", "Cheese", "Vegetables"];

export default function Filters({ onChange, recipeCount }) {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handleCategoriesChange = (selected) => {
    setCategories(selected || []);
    onChange({ categories: selected || [], ingredients });
  };

  const handleIngredientsChange = (selected) => {
    setIngredients(selected || []);
    onChange({ categories, ingredients: selected || [] });
  };

  const handleReset = () => {
    setCategories([]);
    setIngredients([]);
    onChange({ categories: [], ingredients: [] });
  };

  return (
    <div>
      <h2 className={styles.title}>Recipes</h2>
      <div className={styles.filtersSection}>
        <p className={styles.count}>{recipeCount} recipes</p>
        <div className={styles.filters}>
          <button onClick={handleReset} className={styles.reset}>
            Reset filters
          </button>

          <Select
            isMulti
            options={mockCategories.map((c) => ({ value: c, label: c }))}
            value={categories}
            onChange={handleCategoriesChange}
            placeholder="Category"
            classNamePrefix="customSelect"
          />

          <Select
            isMulti
            options={mockIngredients.map((i) => ({ value: i, label: i }))}
            value={ingredients}
            onChange={handleIngredientsChange}
            placeholder="Ingredient"
            classNamePrefix="customSelect"
          />
        </div>
      </div>
    </div>
  );
}
