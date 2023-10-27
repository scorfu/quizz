import { ReactElement, useRef } from "react";

type LineProps = {
    answer?: string | ReactElement;
    onClickLine?: () => void;
}

function Line({answer, onClickLine}: LineProps) {
    const reff = useRef(null);
    function selectedAnswer() {
        console.log(reff.current!);
    }
    return (
        <li ref={reff} onClick={selectedAnswer}>{answer}</li>
    )
}

export default Line;