import {useCallback, useEffect, useRef, useState} from 'react';
import {ButtonVariant} from '../types/button.enum';
import useRandom from './useRandom';

const useColor = () => {
  const {random, generateRandom} = useRandom();

  const [color, setColor] = useState(ButtonVariant.DANGER);
  const [start, setStart] = useState(false);
  const colorRef = useRef<NodeJS.Timeout | null>(null);

  const handleColor = useCallback(() => {
    colorRef.current = setTimeout(() => {
      setColor(
        color === ButtonVariant.SUCCESS
          ? ButtonVariant.DANGER
          : ButtonVariant.SUCCESS,
      );
    }, random);
  }, [random, color]);

  const startColor = () => {
    generateRandom();
    setStart(true);
  };

  const stopColor = () => {
    setColor(ButtonVariant.DANGER);
    setStart(false);
  };

  useEffect(() => {
    if (start) {
      colorRef.current && clearTimeout(colorRef.current);
      generateRandom();
      handleColor();
    } else {
      colorRef.current && clearTimeout(colorRef.current);
    }
  }, [color, start, generateRandom, handleColor]);

  return {color, startColor, stopColor};
};

export default useColor;
