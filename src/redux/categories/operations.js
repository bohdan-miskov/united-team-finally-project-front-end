import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";

export const getCategories = createAsyncThunk("categories/getAll", async () => {
  const response = await api.get("/categories");
  return response.data;
});
