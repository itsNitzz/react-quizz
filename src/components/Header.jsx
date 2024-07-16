import ReactQuizImg from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={ReactQuizImg} alt="react quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
