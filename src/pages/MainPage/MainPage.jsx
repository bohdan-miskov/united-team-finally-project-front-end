import React from "react";
import Hero from "./components/Hero";
import RecipesList from "../../components/RecipesList/RecipesList";

export default function MainPage() {
  return (
    <div>
      <Hero />
      <RecipesList />
    </div>
  );
}
