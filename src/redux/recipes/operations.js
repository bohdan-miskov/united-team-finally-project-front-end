import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectSearchCategory,
  selectSearchIngredients,
  selectSearchQuery,
} from "../filters/selectors";
import api from "../../services/axiosConfig";

const perPage = 12;

export const getAllRecipes = createAsyncThunk(
  "recipes/getAll",
  async (newPage, thunkApi) => {
    const state = thunkApi.getState();
    const query = selectSearchQuery(state);
    const category = selectSearchCategory(state);
    const ingredients = selectSearchIngredients(state);

    const response = await api.get("/recipes/", {
      params: { query, category, ingredients, page: newPage, perPage },
    });
    return response.data;
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (payload) => {
    const response = await api.post("/recipes/", payload);
    return response.data;
  }
);

export const getFavoriteRecipes = createAsyncThunk(
  "recipes/getFavorite",
  async (newPage) => {
    const response = await api.get("/recipes/", {
      params: { page: newPage, perPage },
    });
    return response.data;
  }
);

export const addRecipeToFavorite = createAsyncThunk(
  "recipes/addToFavorite",
  async (recipeId) => {
    const response = await api.post(`/recipes/${recipeId}`);
    return response.data;
  }
);

export const deleteRecipeFromFavorite = createAsyncThunk(
  "recipes/deleteFromFavorite",
  async (recipeId) => {
    const response = await api.delete(`/recipes/${recipeId}`);
    return response.data;
  }
);

export const getOwnRecipes = createAsyncThunk(
  "recipes/getOwn",
  async (newPage) => {
    const response = await api.get("/recipes/", {
      params: { page: newPage, perPage },
    });
    return response.data;
  }
);
