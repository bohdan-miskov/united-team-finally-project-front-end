import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './operations';
import { setPending, setRejected } from '../helpers/statusHandlers';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, state => {
        setPending(state);
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log('🚀 ~  action:', action);
        setRejected(state, action);
      });
  },
});

export default categoriesSlice.reducer;
