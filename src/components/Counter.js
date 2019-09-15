import React from 'react';
import { useState, useEffect, withHooks } from '../hooks';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(500);

  useEffect(() => {
    const id = setTimeout(() => setCount(count + 1), delay);
    return () => clearTimeout(id);
  }, [count]);

  return (
    <div>
      Delay (ms): <input type="text" value={delay} onChange={e => setDelay(Number(e.target.value))} />
      <div>Counter: {count}</div>
    </div>
  );
};

export default withHooks(Counter);
