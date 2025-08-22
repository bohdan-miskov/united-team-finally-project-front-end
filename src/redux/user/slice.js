import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./operations";
import { setPending, setRejected } from "../helpers/statusHandlers";

const initialState = {
  profile: {},
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
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
