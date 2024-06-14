import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setConfigMessage: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setConfigMessage } = messageSlice.actions;
export default messageSlice.reducer;
