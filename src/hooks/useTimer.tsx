import {useCallback, useEffect, useRef, useState} from 'react';

interface Timer {
  time: number;
  startTimer: () => void;
  reset: () => void;
  pause: () => void;
}

const useTimer = (timeout = 1): Timer => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setStart(true);
    timeRef.current = setTimeout(() => {
      setTime(time + 1);
    }, timeout);
  }, [time, timeout]);

  const reset = () => {
    if (timeRef.current) {
      setStart(false);
      setTime(0);
      clearTimeout(timeRef.current);
    }
  };

  const pause = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  };

  useEffect(() => {
    if (start) {
      startTimer();
    } else {
      reset();
    }

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, [time, startTimer, start]);

  return {time, startTimer, reset, pause};
};

export default useTimer;
