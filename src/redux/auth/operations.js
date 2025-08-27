import { createAsyncThunk } from '@reduxjs/toolkit';
import api, {
  clearAuthHeader,
  setAuthHeader,
} from '../../services/axiosConfig';
import { selectIsAuthenticated } from './selectors';

// export const registerAndLoginUser = createAsyncThunk(
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

export const registerUser = createAsyncThunk('auth/register', async user => {
  const response = await api.post('/auth/register', user);
  return response.data.data;
  // console.log(api.e);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // return user;
});

export const logInUser = createAsyncThunk('auth/logIn', async userData => {
  const response = await api.post('/auth/login', userData);
  setAuthHeader(response.data.data.accessToken);
  return response.data.data;
  // console.log(userData);
  // setAuthHeader("1234");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // return { accessToken: "1234" };
});

export const logOutUser = createAsyncThunk('auth/logOut', async () => {
  await api.post('/auth/logout');
  clearAuthHeader();
  //await new Promise(resolve => setTimeout(resolve, 2000));
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const isAuthenticated = selectIsAuthenticated(thunkApi.getState());
    if (!isAuthenticated) {
      return thunkApi.rejectWithValue('Is not Authenticated user');
    }
    return thunkApi.rejectWithValue('Is not Authenticated user');
    // const response = await api.post("/auth/");
    // setAuthHeader(response.data.data.accessToken);
    // return response.data.data;
    setAuthHeader('1234');
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { accessToken: '1234' };
  }
);
