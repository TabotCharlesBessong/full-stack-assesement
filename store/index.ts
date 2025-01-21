import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courses.slice";
import trainersReducer from "./slices/trainer.slice";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    trainers: trainersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
