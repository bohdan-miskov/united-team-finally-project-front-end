import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getIngredients = wrapAsyncThunk('ingredients/getAll', async () => {
  const response = await api.get('/ingredients');
  return response.data.data;
});
