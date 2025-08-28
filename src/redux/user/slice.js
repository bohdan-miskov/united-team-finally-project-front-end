import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from './operations';
import { setPending, setRejected } from '../helpers/statusHandlers';

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addRecipeToUserFavourites(state, action) {
      if (!state.profile) return;

      const recipeId = action.payload;

      if (!state.profile.favourites.includes(recipeId)) {
        state.profile.favourites.push(recipeId);
      }
    },
    removeRecipeFromUserFavourites(state, action) {
      if (!state.profile) return;

      const recipeId = action.payload;

      state.profile.favourites = state.profile.favourites.filter(
        fav => fav !== recipeId
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserInfo.pending, state => {
        setPending(state);
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.profile = {};
        setRejected(state, action);
      });
  },
});

export default userSlice.reducer;
