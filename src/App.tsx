// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import classes from './styles/styles/app.module.css';
import { useRef, useState, useEffect } from "react";
import QuestionsSet from "./components/QuestionsSet";
import Disclaimer from "./components/Disclaimer";
import Leaderboard from "./components/Leaderboard";
import { setBulkOfQuestions } from "./features/questionsSetSlice";
import { fetchData } from "./utils/fetch";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import type { ResponseQuestions, QuestionInfo } from "./utils/types";
import ModalRefreshCheck from "./components/ModalRefreshCheck";
import ModalSubmitName from "./components/ModalSubmitName";
import {
  shuffleAnswerOptionsArray,
  findCommonElements,
  compareAnswer,
} from "./utils/utilFunctions";
import { setLeaderBoard, setTotalScore } from "./features/LeaderboardSlice";

function App() {
  const dispatch = useAppDispatch();
  const questionSet: ResponseQuestions["results"] = useAppSelector(
    (state) => state.questions.bulkOfQuestions
  );
  const correctAnswers = useAppSelector(
    (state) => state.questions.correctAnswers
  );
  const totalScore = useAppSelector((state) => state.leaderboard.totalScore);
  const gamesPlayed = useAppSelector((state) => state.leaderboard.gamesPlayed);
  const answersSelected = useRef<string[]>([]);
  const [questionCorrectness, setQuestionCorrectness] = useState<boolean[]>(
    Array(questionSet.length).fill(null)
  );
  const [answersSubmited, setAnswersSubmited] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(5);
  const [score, setScore] = useState<number>(0);
  const [shuffledQuestionSet, setShuffledQuestionSet] = useState<
    QuestionInfo[]
  >([]);
  const [showModalReload, setShowModalReload] = useState(false);
  const [showModalSubmit, setShowModalSubmit] = useState(false);
  const leaderboard = useAppSelector((state) => state.leaderboard.leaderboard);

  const handleStartAgain = () => {
    // Show the modal when the "Start Again" button is clicked
    setShowModalReload(true);
  };

  const handleModalYes = () => {
    window.location.reload();
    setShowModalReload(false);
    setShowModalSubmit(false);
  };

  const handleModalRefreshClose = () => {
    // Close the modal when the user clicks "Close" or "Yes"
    setShowModalReload(false);
    setShowModalSubmit(false);
  };

  // Function to reset state variables for a new quiz
  const resetQuizState = () => {
    answersSelected.current = [];
    setQuestionCorrectness(Array(questionSet.length).fill(null));
    setAnswersSubmited(false);
    setScore(0);

    //Set Interval in order not to crash due too many API requests from user
    const intervalId = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(intervalId); // Stop the interval when countdown reaches 1
          return 5; // Reset countdown to 5 after reaching 1
        } else {
          return prevCountDown - 1;
        }
      });
    }, 1000);
  };

  function handleModalSubmitClose()  {
    console.log('s-a apasat');
    setShowModalReload(false);
    setShowModalSubmit(false);
    resetQuizState();
    window.location.reload();
  }

  //Get the questions from API after clicking the BTN
  function displayQuestion() {
    resetQuizState();
    fetchData("questions").then((response) => {
      const res = response.results!;
      dispatch(setBulkOfQuestions(res));
      setGameStarted(true);
      setAnswersSubmited(false);
    });
  }

  // Get the answers selected (FN is sent as props to child component) and add it to the useRef array
  const handleAnswerOptionClick = (
    selectedAnswer: string,
    questionIndex: number
  ) => {
    answersSelected.current[questionIndex] = selectedAnswer;
  };

  function handleSubmitButton() {
    // if(answersSelected.current.length < 10) {
    //   alert('answer');
    //   return
    // }
    console.log("raspunsuri selectate SUBMIT:", answersSelected);
    const correctGivenAnswersNumber = findCommonElements(
      answersSelected.current,
      correctAnswers
    ).length;
    setScore(correctGivenAnswersNumber);
    dispatch(setTotalScore(correctGivenAnswersNumber));

    console.log("Correct given answers", correctGivenAnswersNumber);
    console.log("Correct answers", correctAnswers);
    console.log("score..", correctGivenAnswersNumber);

    const newCorrectness = questionSet!.map((_, index) => {
      console.log(answersSelected.current[index]);
      return compareAnswer(correctAnswers, answersSelected.current, index);
    });

    // Update correctness state
    setQuestionCorrectness(newCorrectness);

    // Use to modifiy the state so the score is displayed instead of the button
    setAnswersSubmited(true);

    if (gamesPlayed === 9) { // 9 bcs APP does not re-render
      console.log(gamesPlayed);
      setShowModalSubmit(true);
    }
  }

  useEffect(() => {
    // Shuffle the answers for each question JUST ONCE when the component mounts
    const updatedQuestionSet = questionSet.map(
      (singleQuestion: QuestionInfo) => {
        const shuffledAnswers = shuffleAnswerOptionsArray([
          singleQuestion.correct_answer,
          ...singleQuestion.incorrect_answers,
        ]);
        return { ...singleQuestion, all_answers: shuffledAnswers };
      }
    );
    setShuffledQuestionSet(updatedQuestionSet);

    // Fetch data only when the component mounts
    if (!gameStarted) {
      fetchData("get").then((res) => {
        const leaderboard = Object.values(res) as Array<{
          player: string;
          score: number;
        }>;
        dispatch(setLeaderBoard(leaderboard));
      });
    }
  }, [questionSet, gameStarted]);

  return (
    <div className={`${classes.App}`}>
      <div className={`${classes.AppHeader}`}>
        {gameStarted === false ? null : (
          <>
            <button onClick={handleStartAgain} className="btn btn-warning btn-outline-danger border" type="button">Start Again!</button>
            <ModalRefreshCheck
              show={showModalReload}
              onClose={handleModalRefreshClose}
              onYes={handleModalYes}
            />
            <ModalSubmitName
              show={showModalSubmit}
              onClose={handleModalSubmitClose}
              onYes={handleModalYes}
              lastGameScore={score}
            />
            <div>
              <div>Total Score: {totalScore}</div>
              <div>Games played: {gamesPlayed}/ 10</div>
              {answersSubmited === true ? (
                <div>Points scored this round: {score}</div>
              ) : null}
            </div>
          </>
        )}
        <button
          onClick={displayQuestion}
          disabled={countDown !== 5 || gamesPlayed === 10}
        >
          {gameStarted === false
            ? `Start Quizz`
            : `New Quizz ${
                countDown === 5 ? "" : "in " + "( " + countDown + " )"
              }`}
        </button>
        {gameStarted === false ? (
          <div className={`${classes.wrapper}`}>
            <div className={`${classes.content}`}><Disclaimer/></div>
            <div className={`${classes.background}`}><Leaderboard leaderboard={leaderboard} /></div>
          </div>
        ) : (
          <div>
            <div>
              {shuffledQuestionSet.map(
                (singleQuestion: QuestionInfo, index) => (
                  <QuestionsSet
                    singleQuestion={singleQuestion}
                    key={index}
                    questionIndex={index}
                    gameStarted={gameStarted}
                    onAnswerOptionClick={handleAnswerOptionClick}
                    correctness={questionCorrectness[index]}
                  />
                )
              )}
            </div>

            <div>
              {answersSubmited === false ? (
                <button onClick={handleSubmitButton} className="btn btn-success btn-outline-dark mb-1" type="button">Check Answers</button>
              ) : (
                <div>Your score for this round is: {score}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
