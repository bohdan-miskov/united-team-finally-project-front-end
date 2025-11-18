import { createSlice } from '@reduxjs/toolkit';
import {
  confirmUser,
  getOauthGoogleUrl,
  logInUser,
  logInWithGoogle,
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
  isInitialized: false,
  isLoading: false,
  error: null,
  oauthUrl: null,
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
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(logInUser.rejected, (state, action) => {
        setRejected(state, action);
        state.isLoggedIn = false;
        state.isInitialized = false;
      })
      .addCase(logOutUser.pending, state => {
        setPending(state);
      })
      .addCase(logOutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isInitialized = false;
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
        state.isInitialized = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.isInitialized = false;
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
      })
      .addCase(getOauthGoogleUrl.pending, state => {
        setPending(state);
      })
      .addCase(getOauthGoogleUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.oauthUrl = action.payload;
      })
      .addCase(getOauthGoogleUrl.rejected, (state, action) => {
        setRejected(state, action);
        state.oauthUrl = null;
      })
      .addCase(logInWithGoogle.pending, state => {
        setPending(state);
      })
      .addCase(logInWithGoogle.fulfilled, state => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(logInWithGoogle.rejected, (state, action) => {
        setRejected(state, action);
        state.isLoggedIn = false;
        state.isInitialized = false;
      });
  },
});

export default authSlice.reducer;
