import { createSlice } from "@reduxjs/toolkit";
import {
  logInUser,
  logOutUser,
  refreshUser,
  registerAndLoginUser,
  registerUser,
} from "./operations";
import { setPending, setRejected } from "../helpers/statusHandlers";

const initialState = {
  isLoggedIn: false,
  isRefreshing: false,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        setPending(state);
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(logInUser.pending, (state) => {
        setPending(state);
      })
      .addCase(logInUser.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(logInUser.rejected, (state, action) => {
        setRejected(state, action);
        state.isLoggedIn = false;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.pending, (state) => {
        setPending(state);
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isAuthenticated = false;
        state.isLoggedIn = false;
      })
      .addCase(registerAndLoginUser.rejected, (state, action) => {
        setRejected(state, action);
        state.isLoggedIn = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
