import { configureStore } from "@reduxjs/toolkit";
import questionsSetSlice from "../features/questionsSetSlice";
import LeaderboardSlice from "../features/LeaderboardSlice";

export const store = configureStore({
  reducer: {
    questions: questionsSetSlice,
    leaderboard: LeaderboardSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
