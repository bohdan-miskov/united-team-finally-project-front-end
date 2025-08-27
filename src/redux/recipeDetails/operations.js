import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';
import { recipeDetailsExample } from '../tempObjects/recipeDetails';

export const getRecipeDetails = wrapAsyncThunk(
  'recipeDetails/getRecipe',
  async recipeId => {
    const response = await api.get(`recipes/${recipeId}`);
    return response.data.data;
    // console.log(recipeId, api.e);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // return recipeDetailsExample;
  }
);
