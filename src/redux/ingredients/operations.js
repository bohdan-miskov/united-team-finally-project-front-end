import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";

export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async () => {
    const response = await api.get("/ingredients");
    return response.data;
  }
);
