import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return Object.keys(action.payload).reduce((acc, curr) => {
        acc[curr] = action.payload[curr] || state[curr];
        return acc;
      }, {});
    },
  },
});

export const { setUser } = slice.actions;

export default slice.reducer;
