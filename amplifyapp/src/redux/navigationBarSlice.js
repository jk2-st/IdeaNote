// redux/navigationBarSlice.js

import { createSlice } from '@reduxjs/toolkit';

const navigationBarSlice = createSlice({
  name: 'isNavigationBarOpen',
  initialState: { isOpen:false },
  reducers: {
    toggle: (state, action) => {
      return {isOpen: !state.isOpen};
    },
    close: (state, action) => {
      return {isOpen:false};
    }
  },
});

export const { toggle, close } = navigationBarSlice.actions;

export default navigationBarSlice.reducer;
