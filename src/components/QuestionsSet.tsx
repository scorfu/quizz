import type { QuestionInfo } from "../utils/types";
import { useState } from "react";
import classes from "../styles/styles/line.module.css";

interface QuestionsSetProps {
  singleQuestion: QuestionInfo;
  questionIndex: number;
  gameStarted: boolean;
  correctness: boolean | null; // Change boolean to boolean | null
  onAnswerOptionClick: (selectedAnswer: string, questionIndex: number) => void;
}

function QuestionsSet(props: QuestionsSetProps): JSX.Element {
  const questionAnswers: string[] = props.singleQuestion.all_answers;
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // STYLE Create an array of boolean values to track the state of each answer STYLE
  const [isClicked, setIsClicked] = useState<boolean[]>(
    Array(questionAnswers.length).fill(false)
  );

  // Function to handle the click for each answer
  const handleSelectedAnswer = (index: number, questionIndex: number) => {
    // STYLE Toggle the state of the clicked answer STYLE
    const updatedIsClicked = [...isClicked];
    updatedIsClicked[index] = !updatedIsClicked[index];
    // STYLE Remove the style from the previously selected element STYLE
    if (updatedIsClicked[index]) {
      for (let i = 0; i < updatedIsClicked.length; i++) {
        if (i !== index) {
          updatedIsClicked[i] = false;
        }
      }
    }
    setIsClicked(updatedIsClicked);

    // Notify the parent component about the selected answer
    console.log(index);
    console.log(questionAnswers[index]);
    setSelectedAnswer(questionAnswers[index]);
    const ans = questionAnswers[index];
    props.onAnswerOptionClick(ans, questionIndex);
  };

  return (
    <div className={`${classes.completeQ}`}>
      <h3>{props.singleQuestion.question}</h3>
      {questionAnswers.map((answer: string, index) => (
        <p
          // className={`${isClicked[index] ? classes.selected : ""} ${props.correctness === true ? classes.correct : props.correctness === false ? classes.wrong : ""}`}
          className={`${selectedAnswer === answer ? classes.selected : ""} ${
            props.correctness === true && answer === selectedAnswer
              ? classes.correct
              : props.correctness === false && answer === selectedAnswer
              ? classes.wrong
              : ""
          }`}
          onClick={() => handleSelectedAnswer(index, props.questionIndex)}
          key={index}
        >
          {answer}
        </p>
      ))}
    </div>
  );
}

export default QuestionsSet;
