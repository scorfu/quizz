import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionsSet from "./components/QuestionsSet";
import { fetchQuestions } from "./utils/fetch";
import type { Response, QuestionInfo } from "./utils/types";
import { setBulkOfQuestions } from "./features/questionsSetSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";

function App() {
  const dispatch = useAppDispatch();
  const questionSet: Response["results"] = useAppSelector(
    (state) => state.questions.bulkOfQuestions
  );

  function displayQuestion() {
    fetchQuestions().then((response) => {
      const res = response.results!;
      dispatch(setBulkOfQuestions(res))
      console.log(res);
      console.log(res[0].question);
      console.log(res[0].incorrect_answers);
      console.log(res[0].correct_answer);
      // res?.map((r) => {
      //   dispatch(setBulkOfQuestions([r]));
      // });
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={displayQuestion}>Show Qustion</button>
        {questionSet.map((singleQuestion: QuestionInfo, index) => (
          <QuestionsSet
            singleQuestion={singleQuestion}
            // questionIndex={index}
            key={index}
          ></QuestionsSet>
        ))}
      </header>
      <button>Check</button>
    </div>
  );
}

export default App;
