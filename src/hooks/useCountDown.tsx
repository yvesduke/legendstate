import {useCallback, useEffect, useRef, useState} from 'react';

interface CountDown {
  timeLeft: number;
  startCountDown: () => void;
  resetCount: () => void;
  pauseCountDown: () => void;
}

const useCountDown = (timeout = 1, count = 6000): CountDown => {
  const [timeLeft, setTime] = useState(count);
  const [start, setStart] = useState(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const startCountDown = useCallback(() => {
    setStart(true);
    timeRef.current = setTimeout(() => {
      setTime(timeLeft >= 0 ? timeLeft - 1 : 0);
    }, timeout);
  }, [timeout, timeLeft]);

  const resetCount = useCallback(() => {
    if (timeRef.current) {
      setStart(false);
      setTime(count);
      clearTimeout(timeRef.current);
    }
  }, [count]);

  const pauseCountDown = () => {
    setStart(false);
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  };

  useEffect(() => {
    if (start) {
      timeLeft && startCountDown();
    } else {
      resetCount();
    }

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, [timeLeft, start, resetCount, startCountDown]);

  return {timeLeft, startCountDown, resetCount, pauseCountDown};
};

export default useCountDown;
