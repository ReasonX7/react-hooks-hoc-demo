import React from 'react';
import { useState, withHooks } from '../hooks';

const ColorSwitcher = ({ defaultVisibility, children }) => {
  const [visibility, setVisibility] = useState(defaultVisibility);

  return (
    <div>
      {visibility && children}
      <button onClick={() => setVisibility(!visibility)}>
        {visibility ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default withHooks(ColorSwitcher);
