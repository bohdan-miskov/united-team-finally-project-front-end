import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
