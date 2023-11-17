import "./App.css";
import { useRef } from "react";
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

//   function shuffleAnswerOptionsArray(array: string[]) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }
//   // let allAnswers;
//   // questionSet.forEach((question) => {
//   //   allAnswers = [question.correct_answer, ...question.incorrect_answers];
//   //   console.log('RASP SIMPLUUUU', question.all_answers);
//   //   const mixxx = shuffleAnswerOptionsArray(allAnswers);
//   //   console.log('printeaza din functie', shuffleAnswerOptionsArray(allAnswers));
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
//           shuffleAnswerOptionsArray(allAnswers);
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
  const correctAnswers = useAppSelector(state => state.questions.correctAnswers);
  const answersSelected = useRef<string[]>([]);;

  function displayQuestion() {
    fetchQuestions().then((response) => {
      const res = response.results!;
      // console.log(res);
      dispatch(setBulkOfQuestions(res));
    });
  }

  function shuffleAnswerOptionsArray(array: string[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  function findCommonElements(arr1: string[], arr2: string[]) {
    return arr1.filter(element => arr2.includes(element));
  }

  const handleAnswerClick = (selectedAnswer: string, questionIndex: number) => {
    console.log(selectedAnswer);
    console.log('INDEX', questionIndex);
    answersSelected.current[questionIndex] = selectedAnswer;
    console.log(answersSelected);
    //  //  //  //  //  //  /   / / / / / //  / / /   
    // answersSelected.current = [...answersSelected.current, selectedAnswer];
    //  //  //  //  //  //  /   / / / / / //  / / /   

    // if(answersSelected.every(() => answersSelected.forEach(elem => elem))) console.log("dubulra");
    // Now you can compare and update the value in the store
    // You may dispatch an action to update the state in your Redux store here
    // For example: dispatch(updateSelectedAnswer(selectedAnswer));
  };

  function handleSubmitButton() {
    console.log(answersSelected);
    const compared = findCommonElements(answersSelected.current, correctAnswers);
    console.log(compared);
    console.log('score..', compared.length);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={displayQuestion}>Show Question</button>
        {questionSet.map((singleQuestion: QuestionInfo, index) => {
          // Shuffle the answers for each question
          const all_answers = shuffleAnswerOptionsArray([
            singleQuestion.correct_answer,
            ...singleQuestion.incorrect_answers,
          ]);
          
          return (
            <QuestionsSet
              singleQuestion={{ ...singleQuestion, all_answers }}
              key={index}
              questionIndex={index}
              onAnswerClick={handleAnswerClick}
            />
          );
        })}
      </header>
      <button onClick={handleSubmitButton}>Check</button>
    </div>
  );
}

export default App;

