import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  categories: [],
  ingredients: [],
  sortBy: '',
  sortOrder: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSearchQuery(state, action) {
      state.searchQuery = action.payload?.trim();
    },
    changeSearchCategories(state, action) {
      state.categories = action.payload;
    },
    changeSearchIngredients(state, action) {
      state.ingredients = action.payload;
    },
    changeSortParams(state, action) {
      state.sortBy = action.payload?.sortBy;
      state.sortOrder = action.payload?.sortOrder;
    },
    clearFilters(state) {
      state.categories = [];
      state.ingredients = [];
    },
    clearSearchQuery(state) {
      state.searchQuery = '';
    },
    clearSortParams(state) {
      state.sortBy = '';
      state.sortOrder = '';
    },
    resetAllSearchParams(state) {
      state.categories = [];
      state.ingredients = [];
      state.searchQuery = '';
      state.sortBy = '';
      state.sortOrder = '';
    },
  },
});

export default filtersSlice.reducer;

export const {
  changeSearchQuery,
  changeSearchCategories,
  changeSearchIngredients,
  changeSortParams,
  clearFilters,
  clearSearchQuery,
  clearSortParams,
  resetAllSearchParams,
} = filtersSlice.actions;
