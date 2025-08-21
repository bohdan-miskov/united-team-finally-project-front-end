import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = token;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};

export const signUp = createAsyncThunk("auth/signUp", async (user) => {
  const response = await api.post("/auth/", user);
  setAuthHeader(response.data.accessToken);
  return response.data;
});

export const logIn = createAsyncThunk("auth/logIn", async (userData) => {
  const response = await api.post("/auth/", userData);
  setAuthHeader(response.data.accessToken);
  return response.data;
});

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await api.post("/auth/");
  clearAuthHeader();
});
