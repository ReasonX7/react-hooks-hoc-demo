import React from 'react';
import { EventEmitter } from 'events';

const allHookStates = new Map();
const current = {
  componentPointer: null,
  hookIndex: -1,
};
const emitter = new EventEmitter();

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
    hookStates.push(initialState);
  }

  return [
    hookStates[hookIndex],
    (nextState) => {
      if (nextState !== hookStates[hookIndex]) {
        hookStates[hookIndex] = nextState;
        componentPointer.forceUpdate();
      }
    },
  ];
};

const arraysAreShallowEqual = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => item === b[index]);
};

export const useEffect = (callback, args) => {
  const hookIndex = ++current.hookIndex;
  const componentPointer = current.componentPointer;

  const hookStates = allHookStates.get(componentPointer);

  const handler = (callback) => (pointer) => pointer === componentPointer && callback();

  if (hookStates.length === hookIndex) {
    hookStates.push({ unsubscribe: () => {}, args });

    emitter.on('MOUNT', handler(() => {
      hookStates[hookIndex] = { unsubscribe: callback(), args }
    }));
    emitter.on('UNMOUNT', handler(() => {
      hookStates[hookIndex].unsubscribe();
    }));
  } else {
    emitter.once('UPDATE', handler(() => {
      if (!args || (args.length > 0 && !arraysAreShallowEqual(hookStates[hookIndex].args, args))) {
        hookStates[hookIndex].unsubscribe();
        hookStates[hookIndex] = { unsubscribe: callback(), args };
      }
    }))
  }
};

// The HOC is used in order to, sort of, bind to the React Virtual DOM events.
// Also it is used as identifier for each set of hook states that normally would be stored
// in Virtual DOM nodes (as far, as I know this is how it was made in React v16.8).
class HooksBinder extends React.Component {
  constructor(props) {
    super(props);
    
    // We're using "this" as an identifier to the current hook set.
    allHookStates.set(this, []);

    resetCurrentPointer(this);
  }

  componentDidMount() {
    emitter.emit('MOUNT', this);
  }

  componentWillUpdate() {
    resetCurrentPointer(this);
  }

  componentWillUnmount() {
    emitter.emit('UNMOUNT');
    allHookStates.delete(this);
  }

  componentDidUpdate() {
    emitter.emit('UPDATE', this);
  }

  render() {
    return this.props.content();
  }
}

export const withHooks = BaseComponent => props => (
  <HooksBinder content={() => <BaseComponent {...props} />} />
);
