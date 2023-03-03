// redux/selectedThemeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const selectedThemeSlice = createSlice({
  name: 'selectedTheme',
  initialState: { id: 1 },
  reducers: {
    incrementselectedThemeId: (state) => {
      return {id : state.id+1};
    },
  },
});

export const { incrementselectedThemeId } = selectedThemeSlice.actions;

export default selectedThemeSlice.reducer;
