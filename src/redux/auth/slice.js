import { createSlice } from '@reduxjs/toolkit';
import {
  confirmUser,
  logInUser,
  logOutUser,
  refreshUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from './operations';
import { setPending, setRejected } from '../helpers/statusHandlers';

const initialState = {
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        setPending(state);
      })
      .addCase(registerUser.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(logInUser.pending, state => {
        setPending(state);
      })
      .addCase(logInUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logInUser.rejected, (state, action) => {
        setRejected(state, action);
        state.isLoggedIn = false;
      })
      .addCase(logOutUser.pending, state => {
        setPending(state);
      })
      .addCase(logOutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(requestPasswordReset.pending, state => {
        setPending(state);
      })
      .addCase(requestPasswordReset.fulfilled, state => {
        state.isLoading = false;
        // state.message = action.payload.message;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(resetPassword.pending, state => {
        setPending(state);
      })
      .addCase(resetPassword.fulfilled, state => {
        state.isLoading = false;
        // state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(confirmUser.pending, state => {
        setPending(state);
      })
      .addCase(confirmUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(confirmUser.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default authSlice.reducer;
