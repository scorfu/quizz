import type { QuestionInfo } from "../utils/types";
import { useState } from "react";
import classes from "../styles/styles/line.module.css";

interface QuestionsSetProps {
  singleQuestion: QuestionInfo;
  questionIndex: number;
  onAnswerClick: (selectedAnswer: string, questionIndex: number) => void;
}

function QuestionsSet(props: QuestionsSetProps): JSX.Element {
  let singleQuestion = props.singleQuestion.question.replaceAll(/&#039;/g, "'");
  singleQuestion.replaceAll(/&quot;/g, "'");
  const answers: string[] = props.singleQuestion.all_answers;


  // Create an array of boolean values to track the state of each answer
  const [isClicked, setIsClicked] = useState<boolean[]>(
    Array(answers.length).fill(false)
  );

  // Function to handle the click for each answer
  const handleSelectedAnswer = (index: number, questionIndex: number) => {
    const selectedAnswer = answers[index];
    const updatedIsClicked = [...isClicked];

    // Toggle the state of the clicked answer
    updatedIsClicked[index] = !updatedIsClicked[index];

    // Remove the style from the previously selected element
    if (updatedIsClicked[index]) {
      for (let i = 0; i < updatedIsClicked.length; i++) {
        if (i !== index) {
          updatedIsClicked[i] = false;
        };
      };
    };

    setIsClicked(updatedIsClicked);
        // Notify the parent component about the selected answer
        props.onAnswerClick(selectedAnswer, questionIndex);
  };

  return (
    <>
      <h3>{singleQuestion}</h3>
      {answers.map((answer: string, index) => (
        <div
          className={isClicked[index] ? classes.selected : ""}
          onClick={() => handleSelectedAnswer(index, props.questionIndex)}
          key={index}
        >
          {answer}{props.questionIndex}
        </div>
      ))}
      <hr />
    </>
  );
}

export default QuestionsSet;
