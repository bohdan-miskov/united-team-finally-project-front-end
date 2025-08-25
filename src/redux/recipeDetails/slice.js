import { createSlice } from '@reduxjs/toolkit';
import { getRecipeDetails } from './operations';
import { setPending, setRejected } from '../helpers/statusHandlers';

const initialState = {
  recipe: {},
  isLoading: false,
  error: null,
};

const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getRecipeDetails.pending, state => {
        setPending(state);
      })
      .addCase(getRecipeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipe = action.payload;
      })
      .addCase(getRecipeDetails.rejected, (state, action) => {
        state.recipe = {};
        setRejected(state, action);
      });
  },
});

export default recipeDetailsSlice.reducer;
