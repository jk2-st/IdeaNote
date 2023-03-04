// redux/cognitoAuthSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cognitoAuthSlice = createSlice({
  name: 'cognitoAuth',
  initialState: { },
  reducers: {
    setCognitoAuth: (state, action) => {
      return action.payload
    },
  },
});

export const { setCognitoAuth } = cognitoAuthSlice.actions;

export default cognitoAuthSlice.reducer;
