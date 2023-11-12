import { configureStore } from "@reduxjs/toolkit";
import questionsSetSlice from "../features/questionsSetSlice";

export const store = configureStore({
  reducer: {
    questions: questionsSetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
