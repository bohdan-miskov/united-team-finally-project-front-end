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
  setPaginationArrayRejected,
  setPending,
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
    isLoading: false,
    error: null,
  },
  own: {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
    page: 1,
    totalPages: 1,
    totalItems: 0,
    isLoading: false,
    error: null,
  },
  favorite: {
    items: [],
    hasPreviousPage: false,
    hasNextPage: false,
    page: 1,
    totalPages: 1,
    totalItems: 0,
    isLoading: false,
    error: null,
  },
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllRecipes.pending, state => {
        setPending(state.all);
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.all.isLoading = false;
        // state.all.items =
        //   action.payload.page === 1
        //     ? action.payload.items
        //     : [...state.all.items, ...action.payload.items];
        state.all.items = action.payload.items;
        state.all.hasPreviousPage = action.payload.hasPreviousPage;
        state.all.hasNextPage = action.payload.hasNextPage;
        state.all.page = action.payload.page;
        state.all.totalPages = action.payload.totalPages;
        state.all.totalItems = action.payload.totalItems;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        setPaginationArrayRejected(state.all, action);
      })
      .addCase(createRecipe.pending, state => {
        setPending(state.all);
      })
      .addCase(createRecipe.fulfilled, state => {
        state.all.isLoading = false;
        // state.all.items.pop();
        // state.all.items.unshift(action.payload);
        // state.all.totalItems += 1;
        // state.own.items.pop();
        // state.own.items.unshift(action.payload);
        // state.own.totalItems += 1;
      })
      .addCase(createRecipe.rejected, state => {
        //setRejected(state.all, action);
        state.all.isLoading = false;
      })
      .addCase(updateRecipe.pending, state => {
        setPending(state.all);
      })
      .addCase(updateRecipe.fulfilled, state => {
        state.all.isLoading = false;
      })
      .addCase(updateRecipe.rejected, state => {
        //setRejected(state.all, action);
        state.all.isLoading = false;
      })
      .addCase(deleteRecipe.pending, state => {
        setPending(state.own);
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.own.isLoading = false;
        state.own.items = state.own.items.filter(
          ({ _id }) => _id !== action.payload
        );
        state.own.totalItems -= 1;
      })
      .addCase(deleteRecipe.rejected, state => {
        //setRejected(state.own, action);
        state.own.isLoading = false;
      })
      .addCase(getFavoriteRecipes.pending, state => {
        setPending(state.favorite);
      })
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.favorite.isLoading = false;
        // state.favorite.items =
        //   action.payload.page === 1
        //     ? action.payload.items
        //     : [...state.favorite.items, ...action.payload.items];
        state.favorite.items = action.payload.items;
        state.favorite.hasPreviousPage = action.payload.hasPreviousPage;
        state.favorite.hasNextPage = action.payload.hasNextPage;
        state.favorite.page = action.payload.page;
        state.favorite.totalPages = action.payload.totalPages;
        state.favorite.totalItems = action.payload.totalItems;
      })
      .addCase(getFavoriteRecipes.rejected, (state, action) => {
        setPaginationArrayRejected(state.favorite, action);
      })
      .addCase(addRecipeToFavorite.pending, state => {
        setPending(state.favorite);
      })
      .addCase(addRecipeToFavorite.fulfilled, state => {
        state.favorite.isLoading = false;
        // state.favorite.items.pop();
        // state.favorite.items.unshift(action.payload);
        // // state.favorite.items.pop();
        // state.favorite.totalItems += 1;
      })
      .addCase(addRecipeToFavorite.rejected, state => {
        //setRejected(state.favorite, action);
        state.favorite.isLoading = false;
      })
      .addCase(deleteRecipeFromFavorite.pending, state => {
        setPending(state.favorite);
      })
      .addCase(deleteRecipeFromFavorite.fulfilled, (state, action) => {
        state.favorite.isLoading = false;
        state.favorite.items = state.favorite.items.filter(
          ({ _id }) => _id !== action.payload
        );
        state.favorite.totalItems -= 1;
      })
      .addCase(deleteRecipeFromFavorite.rejected, state => {
        //setRejected(state.favorite, action);
        state.favorite.isLoading = false;
      })
      .addCase(getOwnRecipes.pending, state => {
        setPending(state.own);
      })
      .addCase(getOwnRecipes.fulfilled, (state, action) => {
        state.own.isLoading = false;
        state.own.items = action.payload.items;
        // state.own.items =
        //   action.payload.page === 1
        //     ? action.payload.items
        //     : [...state.own.items, ...action.payload.items];
        state.own.hasPreviousPage = action.payload.hasPreviousPage;
        state.own.hasNextPage = action.payload.hasNextPage;
        state.own.page = action.payload.page;
        state.own.totalPages = action.payload.totalPages;
        state.own.totalItems = action.payload.totalItems;
      })
      .addCase(getOwnRecipes.rejected, (state, action) => {
        setPaginationArrayRejected(state.own, action);
      })
      .addCase(logOutUser.fulfilled, state => {
        resetPaginationArray(state.favorite);
        resetPaginationArray(state.own);
      });
  },
});

export default recipesSlice.reducer;
