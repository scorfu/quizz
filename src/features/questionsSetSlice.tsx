import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store/store";
import { fetchQuestions } from "../utils/fetch";
import type { QuestionInfo } from "../utils/types";

interface InitialQuestion {
  bulkOfQuestions: QuestionInfo[];
  questionInfo: QuestionInfo | [];
  correctAnswers: string[];
  incorrectAnwsers: string[][];
  answers: string[];
  currentScore: number;
  totalScore: number;
};

const initialState: InitialQuestion = {
  bulkOfQuestions: [],
  questionInfo: [],
  correctAnswers: [],
  incorrectAnwsers: [],
  answers: [],
  currentScore: 0,
  totalScore: 0,
};

const questionsSetSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setBulkOfQuestions: (state, action: PayloadAction<QuestionInfo[]>) => {
        // state.bulkOfQuestions = state.bulkOfQuestions.concat(action.payload)
        state.bulkOfQuestions = action.payload;
        // state.answers = action.payload.filter(q => q = q.correct_answer);
        // const aa: string[] = []
        // const a = action.payload.forEach(q => aa.push(q.correct_answer))
        // console.log(aa);
        state.answers = action.payload.map(q => q.correct_answer);
        state.incorrectAnwsers = action.payload.map(q => q.incorrect_answers)
        console.log(state.answers);
        console.log(state.incorrectAnwsers);
    },
    setQuestionInfo: (state, action: PayloadAction<QuestionInfo>) => {
        state.questionInfo = action.payload
    }
  },
});

export const { setBulkOfQuestions, setQuestionInfo} = questionsSetSlice.actions;

export const selectCount = (state: RootState) => state.questions.bulkOfQuestions

export default questionsSetSlice.reducer;