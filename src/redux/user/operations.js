import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';
import { userExample } from '../tempObjects/user';

export const getUserInfo = wrapAsyncThunk('user/getUserInfo', async () => {
  const response = await api.get('/current');
  return response.data.data;
  // console.log(api.e);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // return userExample;
});
