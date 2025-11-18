import { createSlice } from '@reduxjs/toolkit';
import { getUnits } from './operations';
import { setPending, setRejected } from '../helpers/statusHandlers';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUnits.pending, state => {
        setPending(state);
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getUnits.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default unitsSlice.reducer;
