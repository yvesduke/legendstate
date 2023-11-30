import {useCallback, useState} from 'react';

interface Random {
  random: number;
  generateRandom: () => void;
}

const useRandom = (): Random => {
  const [random, setRandom] = useState(0);

  const generateRandom = useCallback(() => {
    setRandom(Math.floor(Math.random() * 6 + 1) * 1000);
  }, []);

  return {random, generateRandom};
};

export default useRandom;
