import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  category: "",
  ingredients: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSearchQuery(state, action) {
      state.searchQuery = action.payload?.trim().toLowerCase();
    },
    changeSearchCategory(state, action) {
      state.category = action.payload?.trim().toLowerCase();
    },
    changeSearchIngredients(state, action) {
      state.ingredients = action.payload;
    },
    clearFilters(state) {
      state.category = "";
      state.ingredients = [];
    },
  },
});

export default filtersSlice.reducer;

export const {
  changeSearchQuery,
  changeSearchCategory,
  changeSearchIngredients,
  clearFilters,
} = filtersSlice.actions;
