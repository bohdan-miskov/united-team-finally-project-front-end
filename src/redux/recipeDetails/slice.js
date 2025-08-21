import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {},
  isLoading: false,
  error: null,
};

const recipeDetailsSlice = createSlice({
  name: "recipeDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default recipeDetailsSlice.reducer;
