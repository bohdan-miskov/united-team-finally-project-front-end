import api, {
  clearAuthHeader,
  setAuthHeader,
} from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../../services/wrapAsyncThunk';
import { selectIsAuthenticated } from './selectors';

// export const registerAndLoginUser = wrapAsyncThunk(
//   "auth/registerAndLogin",
//   async (userData, thunkApi) => {
//     await thunkApi.dispatch(registerUser(userData)).unwrap();
//     const loginResponse = await thunkApi
//       .dispatch(
//         logInUser({
//           email: userData.email,
//           password: userData.password,
//         })
//       )
//       .unwrap();
//     return loginResponse;
//   }
// );

export const registerUser = wrapAsyncThunk('auth/register', async user => {
  const response = await api.post('/auth/register', user, {
    skipRefresh: true,
  });
  setAuthHeader(response.data.data.accessToken);
  return response.data.data;
  // console.log(api.e);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // return user;
});

export const logInUser = wrapAsyncThunk('auth/logIn', async userData => {
  const response = await api.post('/auth/login', userData, {
    skipRefresh: true,
  });
  setAuthHeader(response.data.data.accessToken);
  return response.data.data;
  // console.log(userData);
  // setAuthHeader("1234");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // return { accessToken: "1234" };
});

export const logOutUser = wrapAsyncThunk('auth/logOut', async () => {
  await api.post('/auth/logout', {}, { skipRefresh: true });
  clearAuthHeader();
  //await new Promise(resolve => setTimeout(resolve, 2000));
});

export const refreshUser = wrapAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const isAuthenticated = selectIsAuthenticated(thunkApi.getState());
    if (!isAuthenticated) {
      return thunkApi.rejectWithValue('Is not Authenticated user');
    }
    // return thunkApi.rejectWithValue('Is not Authenticated user');
    const response = await api.post('/auth/refresh', {}, { skipRefresh: true });
    setAuthHeader(response.data.data.accessToken);
    return response.data.data;
    // setAuthHeader('1234');
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // return { accessToken: '1234' };
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
