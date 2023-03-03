import { configureStore } from '@reduxjs/toolkit';
import selectedThemeReducer from './selectedThemeSlice';
import commentReducer from '../redux/commentSlice';
import themeListReducer from '../redux/themeListSlice';
 
const store = configureStore({
  reducer: {
    selectedTheme: selectedThemeReducer,
    comment: commentReducer,
    themeList: themeListReducer,
  },
});
export default store;