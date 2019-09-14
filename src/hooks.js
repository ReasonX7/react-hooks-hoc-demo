import React from 'react';

const allHookStates = new Map();
const current = {
  componentPointer: null,
  hookIndex: -1,
};

const resetCurrentPointer = (nextPointer) => {
  current.componentPointer = nextPointer;
  // If the pointer was reset - a set of hooks will be called.
  // We need to reset the index, so
  current.hookIndex = -1;
};

export const useState = (initialState) => {
  const hookIndex = ++current.hookIndex;
  const componentPointer = current.componentPointer;

  const hookStates = allHookStates.get(componentPointer);

  if (hookStates.length === hookIndex) {
    // "Mount" hook state.
    hookStates.push(initialState);
  }

  const currentState = hookStates[hookIndex];

  return [
    currentState,
    (nextState) => {
      if (nextState !== currentState) {
        hookStates[hookIndex] = nextState;
        componentPointer.forceUpdate();
      }
    },
  ];
};

class HooksBinder extends React.Component {
  constructor(props) {
    super(props);

    // We're using "this" as an identifier to the current hook set.
    allHookStates.set(this, []);

    resetCurrentPointer(this);
  }

  componentWillUpdate() {
    resetCurrentPointer(this);
  }

  componentWillUnmount() {
    allHookStates.delete(this);
  }

  render() {
    return this.props.content();
  }
}

export const withHooks = BaseComponent => props => (
  <HooksBinder content={() => <BaseComponent {...props} />} />
);
