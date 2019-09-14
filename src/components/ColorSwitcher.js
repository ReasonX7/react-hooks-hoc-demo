import React from 'react';
import { useState, withHooks } from '../hooks';

const ColorSwitcher = ({ firstColor = 'orange', secondColor = 'white' }) => {
  const [color, setColor] = useState(firstColor);

  return (
    <button
      style={{ background: color }}
      onClick={() => setColor(color === firstColor ? secondColor : firstColor)}
    >
      Switch Color
    </button>
  );
};

export default withHooks(ColorSwitcher);
