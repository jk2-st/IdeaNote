// redux/cognitoAuthSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cognitoAuthSlice = createSlice({
  name: 'cognitoAuth',
  initialState: { token: ""},
  reducers: {
    setCognitoAuth: (state, action) => {
      return {token: action.payload}
    },
  },
});

export const { setCognitoAuth } = cognitoAuthSlice.actions;

export default cognitoAuthSlice.reducer;
