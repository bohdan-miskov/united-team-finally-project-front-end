import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  categories: [],
  ingredients: [],
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
    clearFilters(state) {
      state.categories = [];
      state.ingredients = [];
    },
  },
});

export default filtersSlice.reducer;

export const {
  changeSearchQuery,
  changeSearchCategories,
  changeSearchIngredients,
  clearFilters,
} = filtersSlice.actions;
