import { createSlice } from '@reduxjs/toolkit';
import {
  addRecipeToFavorite,
  createRecipe,
  deleteRecipe,
  deleteRecipeFromFavorite,
  getAllRecipes,
  getFavoriteRecipes,
  getOwnRecipes,
  updateRecipe,
} from './operations';
import {
  resetPaginationArray,
  setListPending,
  setListRejected,
  setOperationPending,
  setOperationRejected,
  setPaginationArrayRejected,
} from '../helpers/statusHandlers';
import { logOutUser } from '../auth/operations';

const initialState = {
  all: {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
    page: 1,
    totalPages: 1,
    totalItems: 0,
  },
  own: {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
    page: 1,
    totalPages: 1,
    totalItems: 0,
  },
  favorite: {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
    page: 1,
    totalPages: 1,
    totalItems: 0,
  },
  operationLoading: false,
  operationError: null,
  listLoading: false,
  listError: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllRecipes.pending, state => {
        setListPending(state);
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.listLoading = false;

        state.all.items = action.payload.items;
        state.all.hasPreviousPage = action.payload.hasPreviousPage;
        state.all.hasNextPage = action.payload.hasNextPage;
        state.all.page = action.payload.page;
        state.all.totalPages = action.payload.totalPages;
        state.all.totalItems = action.payload.totalItems;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        setPaginationArrayRejected(state.all);
        setListRejected(state, action);
      })
      .addCase(createRecipe.pending, state => {
        setOperationPending(state);
      })
      .addCase(createRecipe.fulfilled, state => {
        state.operationLoading = false;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        setOperationRejected(state, action);
      })
      .addCase(updateRecipe.pending, state => {
        setOperationPending(state);
      })
      .addCase(updateRecipe.fulfilled, state => {
        state.operationLoading = false;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        setOperationRejected(state, action);
      })
      .addCase(deleteRecipe.pending, state => {
        setOperationPending(state);
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.own.items = state.own.items.filter(
          ({ _id }) => _id !== action.payload
        );
        if (state.own.totalItems > 0) {
          state.own.totalItems -= 1;
        }
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        setOperationRejected(state, action);
      })
      .addCase(getFavoriteRecipes.pending, state => {
        setListPending(state);
      })
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.listLoading = false;

        state.favorite.items = action.payload.items;
        state.favorite.hasPreviousPage = action.payload.hasPreviousPage;
        state.favorite.hasNextPage = action.payload.hasNextPage;
        state.favorite.page = action.payload.page;
        state.favorite.totalPages = action.payload.totalPages;
        state.favorite.totalItems = action.payload.totalItems;
      })
      .addCase(getFavoriteRecipes.rejected, (state, action) => {
        setPaginationArrayRejected(state.favorite);
        setListRejected(state, action);
      })
      .addCase(addRecipeToFavorite.pending, state => {
        setOperationPending(state);
      })
      .addCase(addRecipeToFavorite.fulfilled, state => {
        state.operationLoading = false;
      })
      .addCase(addRecipeToFavorite.rejected, (state, action) => {
        setOperationRejected(state, action);
      })
      .addCase(deleteRecipeFromFavorite.pending, state => {
        setOperationPending(state);
      })
      .addCase(deleteRecipeFromFavorite.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.favorite.items = state.favorite.items.filter(
          ({ _id }) => _id !== action.payload
        );
        if (state.favorite.totalItems > 0) {
          state.favorite.totalItems -= 1;
        }
      })
      .addCase(deleteRecipeFromFavorite.rejected, (state, action) => {
        setOperationRejected(state, action);
      })
      .addCase(getOwnRecipes.pending, state => {
        setListPending(state);
      })
      .addCase(getOwnRecipes.fulfilled, (state, action) => {
        state.listLoading = false;

        state.own.items = action.payload.items;
        state.own.hasPreviousPage = action.payload.hasPreviousPage;
        state.own.hasNextPage = action.payload.hasNextPage;
        state.own.page = action.payload.page;
        state.own.totalPages = action.payload.totalPages;
        state.own.totalItems = action.payload.totalItems;
      })
      .addCase(getOwnRecipes.rejected, (state, action) => {
        setPaginationArrayRejected(state.own);
        setListRejected(state, action);
      })
      .addCase(logOutUser.fulfilled, state => {
        resetPaginationArray(state.favorite);
        resetPaginationArray(state.own);
      });
  },
});

export default recipesSlice.reducer;
