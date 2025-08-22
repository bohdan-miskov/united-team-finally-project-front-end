import React from "react";
import Hero from "./components/Hero";
import Filters from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipesList/RecipesList";

export default function MainPage() {
  return (
    <div>
      <Hero />
      <RecipesList />
    </div>
  );
}
