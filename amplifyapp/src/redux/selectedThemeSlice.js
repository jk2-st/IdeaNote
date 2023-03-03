// redux/selectedThemeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const selectedThemeSlice = createSlice({
  name: 'selectedTheme',
  initialState: { id: 1 },
  reducers: {
    incrementselectedThemeId: (state, action) => {
      console.log('selectedThemeSlice action is', action);
      return {id: action.payload};
    },
  },
});

export const { incrementselectedThemeId } = selectedThemeSlice.actions;

export default selectedThemeSlice.reducer;
