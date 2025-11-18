export const selectRecipesListIsLoading = state => state.recipes.listLoading;
export const selectRecipesListError = state => state.recipes.listError;
export const selectRecipesOperationIsLoading = state =>
  state.recipes.operationLoading;
export const selectRecipesOperationError = state =>
  state.recipes.operationError;
export const selectPrevRecipeType = state => state.recipes.prevRecipeType;

export const selectAllRecipesItems = state => state.recipes.all.items;
export const selectAllRecipesHasPreviousPage = state =>
  state.recipes.all.hasPreviousPage;
export const selectAllRecipesHasNextPage = state =>
  state.recipes.all.hasNextPage;
export const selectAllRecipesPage = state => state.recipes.all.page;
export const selectAllRecipesTotalPages = state => state.recipes.all.totalPages;
export const selectAllRecipesTotalItems = state => state.recipes.all.totalItems;

export const selectOwnRecipesItems = state => state.recipes.own.items;
export const selectOwnRecipesHasPreviousPage = state =>
  state.recipes.own.hasPreviousPage;
export const selectOwnRecipesHasNextPage = state =>
  state.recipes.own.hasNextPage;
export const selectOwnRecipesPage = state => state.recipes.own.page;
export const selectOwnRecipesTotalPages = state => state.recipes.own.totalPages;
export const selectOwnRecipesTotalItems = state => state.recipes.own.totalItems;

export const selectFavoriteRecipesItems = state => state.recipes.favorite.items;
export const selectFavoriteRecipesHasPreviousPage = state =>
  state.recipes.favorite.hasPreviousPage;
export const selectFavoriteRecipesHasNextPage = state =>
  state.recipes.favorite.hasNextPage;
export const selectFavoriteRecipesPage = state => state.recipes.favorite.page;
export const selectFavoriteRecipesTotalPages = state =>
  state.recipes.favorite.totalPages;
export const selectFavoriteRecipesTotalItems = state =>
  state.recipes.favorite.totalItems;
