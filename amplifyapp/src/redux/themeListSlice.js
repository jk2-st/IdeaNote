// redux/themeListSlice.js

import { createSlice } from '@reduxjs/toolkit';

const themeListSlice = createSlice({
  name: 'themeList',
  initialState: [{ entity_id: "theme-1", title: "モックのタイトルです" }],
  reducers: {
    setThemeList: (state, action) => {
      return action.payload
    },
  },
});

export const { setThemeList } = themeListSlice.actions;

export default themeListSlice.reducer;
