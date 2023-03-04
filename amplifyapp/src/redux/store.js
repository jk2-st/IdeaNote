import { configureStore } from '@reduxjs/toolkit';
import selectedThemeReducer from './selectedThemeSlice';
import commentReducer from '../redux/commentSlice';
import themeListReducer from '../redux/themeListSlice';
import cognitoAuthReducer from '../redux/cognitoAuthSlice';
 
const store = configureStore({
  reducer: {
    selectedTheme: selectedThemeReducer,
    comment: commentReducer,
    themeList: themeListReducer,
    cognitoAuth: cognitoAuthReducer,
  },
});
export default store;