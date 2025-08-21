import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const response = await api.get("/users/");
  return response.data;
});
