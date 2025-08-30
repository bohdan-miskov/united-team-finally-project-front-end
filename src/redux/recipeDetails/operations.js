import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getRecipeDetails = wrapAsyncThunk(
  'recipeDetails/getRecipe',
  async recipeId => {
    const response = await api.get(`recipes/${recipeId}`);
    return response.data.data;
  }
);
