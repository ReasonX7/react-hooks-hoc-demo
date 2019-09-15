import React from 'react';
import ReactDOM from 'react-dom';

import ColorSwitcher from './components/ColorSwitcher';
import VisibilityToggler from './components/VisibilityToggler';
import Counter from './components/Counter';

ReactDOM.render(
  <div>
    <div>
      <ColorSwitcher />
      <ColorSwitcher firstColor="red" secondColor="yellow" />
    </div>
    <div>
      <VisibilityToggler>
        I am here
      </VisibilityToggler>
    </div>
    <div>
      <Counter />
      <Counter />
    </div>
  </div>,
  document.getElementById('app'),
);
