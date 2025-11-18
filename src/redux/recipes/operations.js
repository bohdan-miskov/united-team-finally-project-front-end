import {
  selectSearchCategories,
  selectSearchIngredients,
  selectSearchQuery,
  selectSortBy,
  selectSortOrder,
} from '../filters/selectors';
import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

const perPage = 12;

const createSearchParams = (state, newPage) => {
  const searchQuery = selectSearchQuery(state).toLowerCase();
  const categories = selectSearchCategories(state);
  const ingredients = selectSearchIngredients(state);
  const sortBy = selectSortBy(state);
  const sortOrder = selectSortOrder(state);
  return {
    searchQuery,
    categories,
    ingredients,
    sortBy,
    sortOrder,
    page: newPage,
    perPage,
  };
};

export const getAllRecipes = wrapAsyncThunk(
  'recipes/getAll',
  async (newPage, thunkApi) => {
    const state = thunkApi.getState();
    const params = createSearchParams(state, newPage);
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
  async (newPage, thunkApi) => {
    const state = thunkApi.getState();
    const params = createSearchParams(state, newPage);
    const response = await api.get('/recipes/favourites', {
      params: params,
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

export const getOwnRecipes = wrapAsyncThunk(
  'recipes/getOwn',
  async (newPage, thunkApi) => {
    const state = thunkApi.getState();
    const params = createSearchParams(state, newPage);
    const response = await api.get('/recipes/own', {
      params: params,
    });
    return response.data.data;
  }
);
