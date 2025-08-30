import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  categories: [],
  ingredients: [],
  sortBy: 'updatedAt',
  sortOrder: 'asc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSearchQuery(state, action) {
      state.searchQuery = action.payload?.trim().toLowerCase();
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
    resetAllSearchParams(state) {
      state.categories = [];
      state.ingredients = [];
      state.searchQuery = '';
      state.sortBy = 'updatedAt';
      state.sortOrder = 'asc';
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
  resetAllSearchParams,
} = filtersSlice.actions;
