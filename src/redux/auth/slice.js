import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, signUp } from "./operations";
import { setPending, setRejected } from "../helpers/statusHandlers";

const initialState = {
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        setPending(state);
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(logIn.pending, (state) => {
        setPending(state);
      })
      .addCase(logIn.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        setRejected(state, action);
      })
      .addCase(logOut.pending, (state) => {
        setPending(state);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default authSlice.reducer;
