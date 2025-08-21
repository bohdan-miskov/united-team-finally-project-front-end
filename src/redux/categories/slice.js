import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: false,
  error: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
