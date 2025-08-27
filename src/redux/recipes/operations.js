import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  selectSearchCategories,
  selectSearchIngredients,
  selectSearchQuery,
} from '../filters/selectors';
import api from '../../services/axiosConfig';
import { recipesExample } from '../tempObjects/recipes';
import { recipeDetailsExample } from '../tempObjects/recipeDetails';

const perPage = 12;

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async (newPage, thunkApi) => {
    const state = thunkApi.getState();
    const searchQuery = selectSearchQuery(state);
    const categories = selectSearchCategories(state);
    const ingredients = selectSearchIngredients(state);
    const params = {
      searchQuery,
      categories,
      ingredients,
      page: newPage,
      perPage,
    };
    const response = await api.get('/recipes', {
      params: params,
    });
    return response.data.data;

    // console.log(
    //   newPage,
    //   thunkApi.e,
    //   query,
    //   category,
    //   ingredients,
    //   api.e,
    //   perPage
    // );
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // return recipesExample;
  }
);

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async payload => {
    const response = await api.post('/recipes', payload);
    return response.data.data;
    // console.log(payload);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return recipeDetailsExample;
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async recipeId => {
    await api.delete(`/recipes/${recipeId}`);
    return recipeId;
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return recipeId;
  }
);

export const getFavoriteRecipes = createAsyncThunk(
  'recipes/getFavorite',
  async newPage => {
    const response = await api.get('/recipes/favourites', {
      params: { page: newPage, perPage },
    });
    return response.data.data;
    // console.log(newPage);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return recipesExample;
  }
);

export const addRecipeToFavorite = createAsyncThunk(
  'recipes/addToFavorite',
  async recipeId => {
    const response = await api.post(`/recipes/favourites/${recipeId}`);
    return response.data.data;
    // console.log(recipeId);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return recipeDetailsExample;
  }
);

export const deleteRecipeFromFavorite = createAsyncThunk(
  'recipes/deleteFromFavorite',
  async recipeId => {
    await api.delete(`/recipes/favourites/${recipeId}`);
    return recipeId;
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return recipeId;
  }
);

export const getOwnRecipes = createAsyncThunk(
  'recipes/getOwn',
  async newPage => {
    const response = await api.get('/recipes/own', {
      params: { page: newPage, perPage },
    });
    return response.data.data;
    // console.log(newPage);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return recipesExample;
  }
);
