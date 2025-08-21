export const selectRecipeDetails = (state) => state.recipeDetails.recipe;
export const selectRecipeDetailsIsLoading = (state) =>
  state.recipeDetails.isLoading;
export const selectRecipeDetailsError = (state) => state.recipeDetails.error;
