import type { QuestionInfo } from "../utils/types";
import { useRef } from "react";
import Line from "./Line";

function QuestionsSet(props: { singleQuestion: QuestionInfo }): JSX.Element {
  const answers: string[] = [...props.singleQuestion.incorrect_answers, props.singleQuestion.correct_answer];
  // const refs = answers.map(() => useRef<(HTMLLIElement | null)>(null));
  // console.log(props.singleQuestion);
  // console.log(props.singleQuestion.question);

  function selectedAnswer() {
    console.log();
  }
  
    function shuffleArray(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      shuffleArray(answers)
  return (
    <>
    <ul>
      <h3>{props.singleQuestion.question.replaceAll(/&#039; |&quot;/g, "'")}</h3>
      <>
      {answers.map((answer, index) => {
        return (
          <div key={index}>
            {/* <input type="radio" id={answer} name='answer' value={answer} /> */}
            <Line answer={answer} onClickLine={selectedAnswer} />
          </div>
        );
      })}
      </>
    </ul>
    <hr/>
    </>
  );
}

export default QuestionsSet;
