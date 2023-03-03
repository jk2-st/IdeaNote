import { configureStore } from '@reduxjs/toolkit';
import selectedThemeReducer from './selectedThemeSlice';
import commentReducer from '../redux/commentSlice';
 
const store = configureStore({
  reducer: {
    selectedTheme: selectedThemeReducer,
    comment: commentReducer,
  },
});
export default store;