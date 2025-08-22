import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./operations";
import { setPending, setRejected } from "../helpers/statusHandlers";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        setPending(state);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default ingredientsSlice.reducer;
