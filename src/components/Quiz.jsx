import { useRef } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import QuizComplete from "./QuizComplete";
import { useQuizState } from "../hooks/quiz-hooks";

export default function Quiz() {
  const {
    activeQuestionIndex,
    onTimeoutHandler,
    onHandleAnswer,
    quizComplete,
    userAnswers,
    answerState,
  } = useQuizState(QUESTIONS);

  const shuffledAnswers = useRef();

  let timer = 5000;
  if (answerState === "answered") {
    timer = 500;
  }

  if (answerState === "correct" || answerState === "wrong") {
    timer = 700;
  }
  if (quizComplete) return <QuizComplete userAnswers={userAnswers} />;

  if (!answerState) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers].sort(
      () => Math.random() - 0.5
    );
  }

  function setCssClassBasedOnAnswer(answer) {
    const isSelected = userAnswers[userAnswers.length - 1] === answer;
    let cssClass = "";
    if (isSelected && answerState === "answered") {
      cssClass = "selected";
    }

    if ((answerState === "correct" || answerState === "wrong") && isSelected) {
      cssClass = answerState;
    }

    return cssClass;
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={`${activeQuestionIndex}-${timer}`}
          timeout={timer}
          onTimeout={answerState === "" ? onTimeoutHandler : null}
          mode={answerState}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button
                  disabled={answerState !== ""}
                  className={setCssClassBasedOnAnswer(answer)}
                  onClick={() => onHandleAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
