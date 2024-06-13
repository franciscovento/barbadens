import { useDebounce } from '@uidotdev/usehooks';
import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  onChangueValue: (_value: number) => void;
  maxItemsToBuy?: number;
}
const Counter: FC<Props> = ({ onChangueValue, value, maxItemsToBuy = 10 }) => {
  const [counter, setCounter] = useState(value);
  const debounceValue = useDebounce(counter, 1000);
  const hasBeenRendered = useRef(false);

  useEffect(() => {
    if (hasBeenRendered.current) {
      onChangueValue(debounceValue);
    }
    hasBeenRendered.current = true;
  }, [debounceValue]);

  const handleChangueValue = (type: 'increment' | 'decrement') => {
    if (type === 'decrement') {
      setCounter((prev) => {
        if (prev === 1) {
          return prev;
        }
        return prev - 1;
      });
    } else {
      setCounter((prev) => {
        if (prev === maxItemsToBuy) {
          return prev;
        }
        return prev + 1;
      });
    }
  };
  return (
    <div className="w-20  text-sm flex items-center gap-3 border border-gray-500 rounded-md justify-center">
      <button
        className="flex-1"
        onClick={() => handleChangueValue('decrement')}
      >
        -
      </button>
      <span>{counter}</span>
      <button
        className="flex-1"
        onClick={() => handleChangueValue('increment')}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
