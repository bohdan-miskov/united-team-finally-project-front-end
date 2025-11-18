import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';

export const getUserInfo = wrapAsyncThunk('user/getUserInfo', async () => {
  const response = await api.get('/current');
  return response.data.data;
});
