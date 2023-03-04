// redux/commentsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: [{entity_id: 1, comment: "デフォルトの感想です"}],
  reducers: {
    setComments: (state, action) => {
      return action.payload;
    },
    addComments: (state, action) => {
      return state.concat(action.payload);
    }
  },
});

export const { setComments, addComments } = commentSlice.actions;

export default commentSlice.reducer;
