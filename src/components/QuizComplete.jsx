import TrophyImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function QuizComplete({ userAnswers }) {
  const skippedQuestions = userAnswers.reduce((acc, answer) => {
    if (answer === null) acc += 1;
    return acc;
  }, 0);

  const correctQuestions = userAnswers.reduce((acc, answer, i) => {
    if (answer === QUESTIONS[i].answers[0]) acc += 1;
    return acc;
  }, 0);

  const skippedPercentage = Math.round(
    (skippedQuestions / userAnswers.length) * 100
  );
  const correctQuestionPercentage = Math.round(
    (correctQuestions / userAnswers.length) * 100
  );
  return (
    <div id="summary">
      <img src={TrophyImage} alt="trophy icon" />
      <h2>Quiz Complete!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctQuestionPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">
            {Math.round(100 - correctQuestionPercentage - skippedPercentage)}%
          </span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, i) => {
          let cssClasses = "user-answer";

          if (!answer) cssClasses += " skipped";
          else if (answer === QUESTIONS[i].answers[0]) cssClasses += " correct";
          else cssClasses += " wrong";
          return (
            <li key={answer + i}>
              <h3>{i + 1}</h3>
              <p className="question">{QUESTIONS[i].text}</p>
              <p className={cssClasses}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
