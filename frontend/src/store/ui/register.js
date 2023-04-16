import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    name: '',
    email: '',
    password: '',
    address: '',
    role: '',
    business: {
      name: '',
      email: '',
      license_number: '',
      owner_nic: '',
    },
  },
};

export const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = slice.actions;

export default slice.reducer;
