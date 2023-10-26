import type { QuestionInfo } from "../utils/types";
import { useRef } from "react";

function QuestionsSet(props: { singleQuestion: QuestionInfo }): JSX.Element {
  const answers: string[] = [...props.singleQuestion.incorrect_answers, props.singleQuestion.correct_answer];
  const refs = answers.map(() => useRef<(HTMLLIElement | null)>(null));
  // console.log(props.singleQuestion);
  // console.log(props.singleQuestion.question);

  function selectedAnswer() {
    console.log(refs[0].current);
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
            <li ref={refs} onClick={selectedAnswer}>{answer}</li>
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
