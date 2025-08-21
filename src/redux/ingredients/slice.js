import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
});

export default ingredientsSlice.reducer;
