import {
  selectSearchCategories,
  selectSearchIngredients,
  selectSearchQuery,
} from '../filters/selectors';
import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

const perPage = 12;

export const getAllRecipes = wrapAsyncThunk(
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
  }
);

export const createRecipe = wrapAsyncThunk(
  'recipes/createRecipe',
  async payload => {
    const response = await api.post('/recipes', payload);
    return response.data.data;
  }
);

export const updateRecipe = wrapAsyncThunk(
  'recipes/updateRecipe',
  async ({ id, payload }) => {
    const response = await api.patch(`/recipes/own/${id}`, payload);
    return response.data.data;
  }
);

export const deleteRecipe = wrapAsyncThunk(
  'recipes/deleteRecipe',
  async recipeId => {
    await api.delete(`/recipes/${recipeId}`);
    return recipeId;
  }
);

export const getFavoriteRecipes = wrapAsyncThunk(
  'recipes/getFavorite',
  async newPage => {
    const response = await api.get('/recipes/favourites', {
      params: { page: newPage, perPage },
    });
    return response.data.data;
  }
);

export const addRecipeToFavorite = wrapAsyncThunk(
  'recipes/addToFavorite',
  async recipeId => {
    const response = await api.post(`/recipes/favourites/${recipeId}`);
    return response.data.data;
  }
);

export const deleteRecipeFromFavorite = wrapAsyncThunk(
  'recipes/deleteFromFavorite',
  async recipeId => {
    await api.delete(`/recipes/favourites/${recipeId}`);
    return recipeId;
  }
);

export const getOwnRecipes = wrapAsyncThunk('recipes/getOwn', async newPage => {
  const response = await api.get('/recipes/own', {
    params: { page: newPage, perPage },
  });
  return response.data.data;
});
