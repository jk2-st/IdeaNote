import { configureStore } from '@reduxjs/toolkit';
import selectedThemeReducer from './selectedThemeSlice';
import commentReducer from '../redux/commentSlice';
import themeListReducer from '../redux/themeListSlice';
import cognitoAuthReducer from '../redux/cognitoAuthSlice';
import navigationBarReducer from '../redux/navigationBarSlice';
 
const store = configureStore({
  reducer: {
    selectedTheme: selectedThemeReducer,
    comment: commentReducer,
    themeList: themeListReducer,
    cognitoAuth: cognitoAuthReducer,
    navigationBar: navigationBarReducer,
  },
});
export default store;