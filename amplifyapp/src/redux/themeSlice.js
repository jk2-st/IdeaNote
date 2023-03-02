// redux/themeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme_id: 0 },
  reducers: {
    incrementThemeId: (state) => {
      state.theme_id += 1;
    },
  },
});

export const { incrementThemeId } = themeSlice.actions;

export default themeSlice.reducer;
