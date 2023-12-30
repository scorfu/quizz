import "./App.css";
import { useRef, useState, useEffect } from "react";
import QuestionsSet from "./components/QuestionsSet";
import { setBulkOfQuestions } from "./features/questionsSetSlice";
import { fetchQuestions } from "./utils/fetch";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import type { Response, QuestionInfo } from "./utils/types";
import {
  shuffleAnswerOptionsArray,
  findCommonElements,
  compareAnswer,
} from "./utils/utilFunctions";

function App() {
  const dispatch = useAppDispatch();
  const questionSet: Response["results"] = useAppSelector(
    (state) => state.questions.bulkOfQuestions
  );
  const correctAnswers = useAppSelector(
    (state) => state.questions.correctAnswers
  );
  const answersSelected = useRef<string[]>([]);
  const [questionCorrectness, setQuestionCorrectness] = useState<boolean[]>(
    Array(questionSet.length).fill(null)
  );
  const [answersSubmited, setAnswersSubmited] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [shuffledQuestionSet, setShuffledQuestionSet] = useState<QuestionInfo[]>([]);

  //Get the questions from API after clicking the BTN
  function displayQuestion() {
    fetchQuestions().then((response) => {
      const res = response.results!;
      dispatch(setBulkOfQuestions(res));
      setGameStarted(true);
      setAnswersSubmited(false);
    });
  }

  // Get the answers selected (FN is sent as props to child component) and add it to the useRef array
  const handleAnswerOptionClick = (selectedAnswer: string, questionIndex: number) => {
    answersSelected.current[questionIndex] = selectedAnswer;
    console.log("raspunsuri selectate:", answersSelected);
    console.log("CE MI VINE CAND DA CLICK", selectedAnswer);
  };

  function handleSubmitButton() {
    // if(answersSelected.current.length < 10) {
    //   alert('answer');
    //   return
    // }
    console.log("raspunsuri selectate SUBMIT:", answersSelected);
    const correctGivenAnswers = findCommonElements(
      answersSelected.current,
      correctAnswers
    );
    setScore(correctGivenAnswers.length);

    console.log("Correct given answers", correctGivenAnswers);
    console.log("Correct answers", correctAnswers);
    console.log("score..", correctGivenAnswers.length);

    const newCorrectness = questionSet!.map((_, index) =>
{      console.log(answersSelected.current[index]);
      return compareAnswer(correctAnswers, answersSelected.current, index)}
    );

    // Update correctness state
    setQuestionCorrectness(newCorrectness);

    // Use to modifiy the state so the score is displayed instead of the button
    setAnswersSubmited(true);
    
  };

  useEffect(() => {
    // Shuffle the answers for each question JUST ONCE when the component mounts
    const updatedQuestionSet = questionSet.map((singleQuestion: QuestionInfo) => {
      const shuffledAnswers = shuffleAnswerOptionsArray([
        singleQuestion.correct_answer,
        ...singleQuestion.incorrect_answers,
      ]);
      return { ...singleQuestion, all_answers: shuffledAnswers };
    });
    setShuffledQuestionSet(updatedQuestionSet);
  }, [questionSet]);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={displayQuestion}>
          {gameStarted === false ? "Start Quizz" : "Try another Quizz"}
        </button>
        {shuffledQuestionSet.map((singleQuestion: QuestionInfo, index) => (
          <QuestionsSet
            singleQuestion={singleQuestion}
            key={index}
            questionIndex={index}
            gameStarted={gameStarted}
            onAnswerOptionClick={handleAnswerOptionClick}
            correctness={questionCorrectness[index]}
          />
        ))}
      </header>
      {answersSubmited === false ? (
        <button onClick={handleSubmitButton}>Check Answers</button>
      ) : (
        <div>Your Score Is {score}</div>
      )}
    </div>
  );
}

export default App;
