import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: {
    items: [],
    hasNextPage: false,
    page: 1,
    totalItems: 0,
    isLoading: false,
    error: null,
  },
  own: {
    items: [],
    hasNextPage: false,
    page: 1,
    totalItems: 0,
    isLoading: false,
    error: null,
  },
  favorite: {
    items: [],
    hasNextPage: false,
    page: 1,
    totalItems: 0,
    isLoading: false,
    error: null,
  },
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default recipesSlice.reducer;
