import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./reducers/modal";
import courseReducer from "./reducers/course";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    course: courseReducer,
  },
});

export default store;
