import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { QuestionInfo } from "../utils/types";
import { replaceGiberishCharacters } from "../utils/utilFunctions";

interface InitialQuestion {
  bulkOfQuestions: QuestionInfo[];
  questionInfo: QuestionInfo | [];
  correctAnswers: string[];
  incorrectAnwsers: string[][];
  allAnswers: string[][];
}

const initialState: InitialQuestion = {
  bulkOfQuestions: [],
  questionInfo: [],
  correctAnswers: [],
  incorrectAnwsers: [],
  allAnswers: [],
  // gamesPlayed: 0,
  // totalScore: 0,
};

const questionsSetSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setBulkOfQuestions: (state, action: PayloadAction<QuestionInfo[]>) => {
      const allInfoQuestions = action.payload.map(fullQuestion => {
        return {
          ...fullQuestion,
          question: replaceGiberishCharacters(fullQuestion.question),
          correct_answer: replaceGiberishCharacters(fullQuestion.correct_answer),
          incorrect_answers: fullQuestion.incorrect_answers.map(singleIncorrect => replaceGiberishCharacters(singleIncorrect))
        };
      });
      state.bulkOfQuestions = allInfoQuestions;
      state.correctAnswers = allInfoQuestions.map((q) => q.correct_answer);
      state.incorrectAnwsers = allInfoQuestions.map((q) => q.incorrect_answers);
      console.log("correct from Slices store ", state.correctAnswers);
    },
  },
});

export const { setBulkOfQuestions } =
  questionsSetSlice.actions;

export default questionsSetSlice.reducer;
