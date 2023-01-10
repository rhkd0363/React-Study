import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    counter: counterReducer, // => useSelector(state.counter.showCounter)
    auth: authReducer,
  },
});

export default store;
