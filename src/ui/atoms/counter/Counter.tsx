import { FC } from 'react';

interface Props {
  value: number;
  increment: () => void;
  decrement: () => void;
}
const Counter: FC<Props> = ({ decrement, increment, value }) => {
  return (
    <div className="w-20  text-sm flex items-center gap-3 border border-gray-500 rounded-md justify-center">
      <button className="flex-1" onClick={decrement}>
        -
      </button>
      <span>{value}</span>
      <button className="flex-1" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default Counter;
