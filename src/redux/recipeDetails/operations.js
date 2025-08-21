import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";

export const getRecipeDetails = createAsyncThunk(
  "recipeDetails/getRecipe",
  async (recipeId) => {
    const response = await api.get(`recipes/${recipeId}`);
    return response.data;
  }
);
