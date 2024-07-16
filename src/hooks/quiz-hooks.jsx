import { useState, useCallback } from "react";

export function useQuizState(QUESTIONS) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex = answerState
    ? userAnswers.length - 1
    : userAnswers.length;

  const quizComplete = activeQuestionIndex === QUESTIONS.length;

  const onHandleAnswer = useCallback(
    (answer) => {
      if (answer) {
        setAnswerState("answered");
        setTimeout(() => {
          if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
            setAnswerState("correct");
          } else {
            setAnswerState("wrong");
          }

          setTimeout(() => {
            setAnswerState("");
          }, 700);
        }, 500);
      }

      setUserAnswers((prev) => {
        return [...prev, answer];
      });
    },
    [activeQuestionIndex, QUESTIONS]
  );

  const onTimeoutHandler = useCallback(
    () => onHandleAnswer(null),
    [onHandleAnswer]
  );

  return {
    activeQuestionIndex,
    onTimeoutHandler,
    onHandleAnswer,
    quizComplete,
    userAnswers,
    answerState,
  };
}
