import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    let interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let onGoingTimeout = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(onGoingTimeout);
    };
  }, [timeout, onTimeout]);

  return <progress value={remainingTime} max={timeout} className={mode} />;
}
