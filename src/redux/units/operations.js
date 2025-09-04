import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getUnits = wrapAsyncThunk('units/getAll', async () => {
  const response = await api.get('/units');
  return response.data.data;
});
