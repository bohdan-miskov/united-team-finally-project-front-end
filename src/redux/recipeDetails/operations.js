import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";
import { recipeDetailsExample } from "../tempObjects/recipeDetails";

export const getRecipeDetails = createAsyncThunk(
  "recipeDetails/getRecipe",
  async (recipeId) => {
    // const response = await api.get(`recipes/${recipeId}`);
    // return response.data.data;
    console.log(recipeId, api.e);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return recipeDetailsExample;
  }
);
