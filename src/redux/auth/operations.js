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
  setAuthHeader(response.data.data.accessToken);
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
  async (email, thunkApi) => {
    try {
      console.log('Requesting password reset for:', email);
      // const response = await api.post("/auth/request-reset", { email });
      // return response.data;
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { message: 'Reset link sent' };
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || 'Failed to send reset link'
      );
    }
  }
);

export const resetPassword = wrapAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, thunkApi) => {
    try {
      console.log(
        'Resetting password with token:',
        token,
        'New password:',
        password
      );
      // const response = await api.post("/auth/reset-password", { token, password });
      // return response.data;
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { message: 'Password reset successful' };
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || 'Failed to reset password'
      );
    }
  }
);

// export const logInWithGoogle = wrapAsyncThunk(
//   'auth/googleLogIn',
//   async token => {
//     const response = await api.post(
//       '/auth/google',
//       { token },
//       { skipRefresh: true }
//     );
//     setAuthHeader(response.data.data.accessToken);
//     return response.data.data;
//   }
// );

export const logInWithGoogle = wrapAsyncThunk(
  'auth/googleLogIn',
  async credential => {
    const response = await api.post(
      '/auth/google',
      { credential }, // ✅ змінив з { token }
      { skipRefresh: true }
    );
    const payload = response.data;

    console.log('✅ Google API raw response:', response.data);
    if (!payload?.accessToken) {
      throw new Error('Access token missing in response');
    }

    setAuthHeader(payload.accessToken);
    return payload;
  }
);
