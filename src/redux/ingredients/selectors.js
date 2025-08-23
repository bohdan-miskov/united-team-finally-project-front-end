export const selectIngredients = (state) => state.ingredients.items;
export const selectIngredientsIsLoading = (state) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state) => state.ingredients.error;
