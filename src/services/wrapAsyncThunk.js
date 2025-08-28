import { createAsyncThunk } from '@reduxjs/toolkit';

export const wrapAsyncThunk = (type, asyncFunction) => {
  return createAsyncThunk(type, async (arg, thunkApi) => {
    try {
      return await asyncFunction(arg, thunkApi);
    } catch (err) {
      if (err.response) {
        // сервер повернув статус != 2xx
        return thunkApi.rejectWithValue({
          status: err.response.status,
          message: err.response.data?.message || err.message,
        });
      }
      // інші помилки (мережа, таймаут тощо)
      return thunkApi.rejectWithValue({
        status: null,
        message: err.message,
      });
    }
  });
};
