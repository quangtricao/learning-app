import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: null,
  reducers: {
    open(state, action) {
      return action.payload;
    },
    close(state, action) {
      return { ...state, open: action.payload };
    },
  },
});

export const openModal = ({ course = {}, type }) => {
  return async (dispatch) => {
    dispatch(open({ open: true, course, type }));
  };
};

export const closeModal = () => {
  return async (dispatch) => {
    dispatch(close(false));
  };
};

const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
