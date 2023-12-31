import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface leaderboardInfo {
  leaderboard: Array<{ player: string; score: number }>;
  player: string | null;
  gamesPlayed: number;
  totalScore: number;
}

const initialState: leaderboardInfo = {
  leaderboard: [],
  player: null,
  gamesPlayed: 0,
  totalScore: 0,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderBoard: (
      state,
      action: PayloadAction<Array<{ player: string; score: number }>>
    ) => {
      state.leaderboard = action.payload;
      console.log(state.leaderboard);
    },
    setTotalScore: (state, action) => {
      state.totalScore += action.payload;
      if (state.gamesPlayed < 10) {
        state.gamesPlayed++;
      } else {
        return;
      }
      console.log(action.payload);
    },
    setPlayerName: (state, action) => {
      state.player = action.payload;
    },
  },
});

export const { setLeaderBoard, setTotalScore, setPlayerName } =
  leaderboardSlice.actions;

export default leaderboardSlice.reducer;
