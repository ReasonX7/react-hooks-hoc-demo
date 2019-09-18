import React from 'react';
import ReactDOM from 'react-dom';

import ColorSwitcher from './components/ColorSwitcher';

ReactDOM.render(
  <div>
    <ColorSwitcher />
    <ColorSwitcher firstColor="red" secondColor="yellow" />
  </div>,
  document.getElementById('app'),
);
