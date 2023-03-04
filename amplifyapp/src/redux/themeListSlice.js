// redux/themeListSlice.js

import { createSlice } from '@reduxjs/toolkit';

const themeListSlice = createSlice({
  name: 'themeList',
  initialState: [{ entity_id: "theme-1", title: "モックのタイトルです" }],
  reducers: {
    setThemeList: (state, action) => {
      return action.payload
    },
    addThemeList: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const { setThemeList, addThemeList } = themeListSlice.actions;

export default themeListSlice.reducer;
