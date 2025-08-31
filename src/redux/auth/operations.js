import api, {
  clearAuthHeader,
  setAuthHeader,
} from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';
import { selectIsAuthenticated } from './selectors';

export const registerUser = wrapAsyncThunk('auth/register', async user => {
  const response = await api.post('/auth/register', user, {
    skipRefresh: true,
  });
  return response.data.data;
});

export const logInUser = wrapAsyncThunk('auth/logIn', async userData => {
  const response = await api.post('/auth/login', userData, {
    skipRefresh: true,
  });
  setAuthHeader(response.data.data.accessToken);
  return response.data.data;
});

export const logOutUser = wrapAsyncThunk('auth/logOut', async () => {
  await api.post('/auth/logout', {}, { skipRefresh: true });
  clearAuthHeader();
});

export const refreshUser = wrapAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const isAuthenticated = selectIsAuthenticated(thunkApi.getState());
    if (!isAuthenticated) {
      return thunkApi.rejectWithValue('Is not Authenticated user');
    }
    const response = await api.post('/auth/refresh', {}, { skipRefresh: true });
    setAuthHeader(response.data.data.accessToken);
    return response.data.data;
  }
);
export const requestPasswordReset = wrapAsyncThunk(
  'auth/requestPasswordReset',
  async email => {
    const response = await api.post(
      '/auth/request-password-reset',
      { email },
      { skipRefresh: true }
    );
    return response.data.data;
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return { message: 'Reset link sent' };
  }
);

export const resetPassword = wrapAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }) => {
    const response = await api.post(
      '/auth/reset-password',
      {
        token,
        password,
      },
      { skipRefresh: true }
    );
    return response.data;
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return { message: 'Password reset successful' };
  }
);

export const confirmUser = wrapAsyncThunk('auth/confirmUser', async token => {
  const response = await api.post(
    '/auth/confirm-email',
    { token },
    {
      skipRefresh: true,
    }
  );
  setAuthHeader(response.data.data.accessToken);
  return response.data.data;
});
