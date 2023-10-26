import {configureStore} from "@reduxjs/toolkit";

import questionsSetSlice from "../features/questionsSetSlice";
import { type } from "os";

export const store = configureStore({
    reducer: {
        questions: questionsSetSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch