import "./App.css";
import QuestionsSet from "./components/QuestionsSet";
import { fetchQuestions } from "./utils/fetch";
import type { Response, QuestionInfo } from "./utils/types";
import { setBulkOfQuestions } from "./features/questionsSetSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";

// function App() {
//   const dispatch = useAppDispatch();
//   const questionSet: Response["results"] = useAppSelector(
//     (state) => state.questions.bulkOfQuestions
//   );

//   function displayQuestion() {
//     fetchQuestions().then((response) => {
//       const res = response.results!;
//       console.log(res);
//       dispatch(setBulkOfQuestions(res));
//     });
//   }

//   function shuffleArray(array: string[]) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }
//   // let allAnswers;
//   // questionSet.forEach((question) => {
//   //   allAnswers = [question.correct_answer, ...question.incorrect_answers];
//   //   console.log('RASP SIMPLUUUU', question.all_answers);
//   //   const mixxx = shuffleArray(allAnswers);
//   //   console.log('printeaza din functie', shuffleArray(allAnswers));
//   //   console.log('RASP MIXXXXXXXX', mixxx);
//   //   console.log('correct', question.correct_answer);
//   //   // question.all_answers = allAnswers;
//   // });
//   // // console.log(questionSetMixed);

//   const handleAnswerClick = (selectedAnswer: string) => {
//     console.log(selectedAnswer);
//     // Now you can compare and update the value in the store
//     // You may dispatch an action to update the state in your Redux store here
//     // For example: dispatch(updateSelectedAnswer(selectedAnswer));
//   };
//   // const copyOfQuestionSet = [...questionSet]; //////////////
//   const copyOfQuestionSet = [...JSON.parse(JSON.stringify(questionSet))];
//   console.log('THA CPOY', copyOfQuestionSet);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <button onClick={displayQuestion}>Show Qustion</button>
//         {/*questionSet.map((singleQuestion: QuestionInfo, index) => (
//           <QuestionsSet
//             singleQuestion={singleQuestion}
//             key={index}
//             onAnswerClick={handleAnswerClick}
//           ></QuestionsSet>
//         ))*/}
//                 {copyOfQuestionSet.map((singleQuestion: QuestionInfo, index) => {
//           // Shuffle the answers for each question
//           const allAnswers = [
//             singleQuestion.correct_answer,
//             ...singleQuestion.incorrect_answers,
//           ];
//           shuffleArray(allAnswers);
//           console.log('the shuffeld', allAnswers);
//           singleQuestion.all_answers = allAnswers;
//           return (
//             <QuestionsSet
//               singleQuestion={singleQuestion}
//               key={index}
//               onAnswerClick={handleAnswerClick}
//             />
//           );
//         })}
//       </header>
//       <button>Check</button>
//     </div>
//   );
// }

// export default App;

function App() {
  const dispatch = useAppDispatch();
  const questionSet: Response["results"] = useAppSelector(
    (state) => state.questions.bulkOfQuestions
  );

  function displayQuestion() {
    fetchQuestions().then((response) => {
      const res = response.results!;
      console.log(res);
      dispatch(setBulkOfQuestions(res));
    });
  }

  function shuffleArray(array: string[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const handleAnswerClick = (selectedAnswer: string) => {
    console.log(selectedAnswer);
    // Now you can compare and update the value in the store
    // You may dispatch an action to update the state in your Redux store here
    // For example: dispatch(updateSelectedAnswer(selectedAnswer));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={displayQuestion}>Show Question</button>
        {questionSet.map((singleQuestion: QuestionInfo, index) => {
          // Shuffle the answers for each question
          const all_answers = shuffleArray([
            singleQuestion.correct_answer,
            ...singleQuestion.incorrect_answers,
          ]);
          console.log('the shuffled', all_answers);
          
          return (
            <QuestionsSet
              singleQuestion={{ ...singleQuestion, all_answers }}
              key={index}
              onAnswerClick={handleAnswerClick}
            />
          );
        })}
      </header>
      <button>Check</button>
    </div>
  );
}

export default App;

