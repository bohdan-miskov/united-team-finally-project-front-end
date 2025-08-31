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
  isAuthenticated: false,
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
        state.isAuthenticated = true;
      })
      .addCase(logInUser.rejected, (state, action) => {
        setRejected(state, action);
        state.isLoggedIn = false;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.pending, state => {
        setPending(state);
      })
      .addCase(logOutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(refreshUser.pending, state => {
        //state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, state => {
        state.isAuthenticated = true;
        state.isLoggedIn = true;
        //state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        //state.isRefreshing = false;
        state.isAuthenticated = false;
        state.isLoggedIn = false;
      })
      .addCase(requestPasswordReset.pending, state => {
        setPending(state);
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.message = action.payload.message;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(resetPassword.pending, state => {
        setPending(state);
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
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
        state.isAuthenticated = true;
      })
      .addCase(confirmUser.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default authSlice.reducer;
