import { createSlice } from "@reduxjs/toolkit";

const dummyData = [
  {
    title: "Title 1",
    body: "Lizards \nare a widespread group of \nsquamate reptiles, \nwith over 6,000 species,t Antarctica",
    link: "abc.com",
    status: "To do",
  },
  {
    title: "Title 2",
    body: "Lizards \nare  6,000 species,t Antarctica",
    link: "abc.com",
    status: "In progess",
  },
  {
    title: "Title 3",
    body: "Lizards \nare a widesp6,000 species,t Antarctica",
    link: "abc.com",
    status: "In progess",
  },
  {
    title: "Title 4",
    body: "Lizards \nare a widespread group of \nsquamate reptiles, Antarctica",
    link: "abc.com",
    status: "Completed",
  },
  {
    title: "Title 5",
    body: "Lizards \nwith over 6,000 species,t Antarctica",
    link: "abc.com",
    status: "In progess",
  },
];

const courseSlice = createSlice({
  name: "course",
  initialState: dummyData,
  reducers: {
    create(state, action) {
      return state.concat(action.payload);
    },
    update(state, action) {
      return { ...state, open: action.payload };
    },
    delete(state, action) {},
  },
});

export const createCourse = (course = {}) => {
  return async (dispatch) => {
    dispatch(create(course));
  };
};

export const closeModal = () => {
  return async (dispatch) => {
    dispatch(update(false));
  };
};

const { create, update } = courseSlice.actions;
export default courseSlice.reducer;
