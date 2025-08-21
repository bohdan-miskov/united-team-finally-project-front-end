export const selectAllRecipesItems = (state) => state.recipes.all.items;
export const selectAllRecipesHasNextPage = (state) =>
  state.recipes.all.hasNextPage;
export const selectAllRecipesPage = (state) => state.recipes.all.page;
export const selectAllRecipesTotalItems = (state) =>
  state.recipes.all.totalItems;
export const selectAllRecipesIsLoading = (state) => state.recipes.all.isLoading;
export const selectAllRecipesError = (state) => state.recipes.all.error;

export const selectOwnRecipesItems = (state) => state.recipes.own.items;
export const selectOwnRecipesHasNextPage = (state) =>
  state.recipes.own.hasNextPage;
export const selectOwnRecipesPage = (state) => state.recipes.own.page;
export const selectOwnRecipesTotalItems = (state) =>
  state.recipes.own.totalItems;
export const selectOwnRecipesIsLoading = (state) => state.recipes.own.isLoading;
export const selectOwnRecipesError = (state) => state.recipes.own.error;

export const selectFavoriteRecipesItems = (state) =>
  state.recipes.favorite.items;
export const selectFavoriteRecipesHasNextPage = (state) =>
  state.recipes.favorite.hasNextPage;
export const selectFavoriteRecipesPage = (state) => state.recipes.favorite.page;
export const selectFavoriteRecipesTotalItems = (state) =>
  state.recipes.favorite.totalItems;
export const selectFavoriteRecipesIsLoading = (state) =>
  state.recipes.favorite.isLoading;
export const selectFavoriteRecipesError = (state) =>
  state.recipes.favorite.error;
