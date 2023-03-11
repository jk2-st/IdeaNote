// redux/selectedThemeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const selectedThemeSlice = createSlice({
  name: 'selectedTheme',
  initialState: { id: 1 },
  reducers: {
    setSelectedThemeId: (state, action) => {
      return {id: action.payload};
    },
  },
});

export const { setSelectedThemeId } = selectedThemeSlice.actions;

export default selectedThemeSlice.reducer;
