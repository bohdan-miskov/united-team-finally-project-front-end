import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getCategories = wrapAsyncThunk('categories/getAll', async () => {
  const response = await api.get('/categories');
  return response.data.data;
});
