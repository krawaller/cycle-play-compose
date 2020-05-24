/*
Util types and methods to employ a Redux-like action setup. In fact, this code
is stolen straight out of a Redux project. You don't need to use the action
abstraction in CycleJS components, but it is already familiar, it can provide
some extra clarity as to what is going on.
*/

export type Action<T = string, P = any> = {
  type: T;
  payload: P;
};

export type ActionCreator = (...args: any[]) => Action;

// A factory for making action creators
export function factory<F extends ActionCreator, T extends string = string>(
  actionType: T,
  creator: F
) {
  function guard(action: Action): action is ReturnType<F> {
    return action.type === actionType;
  }
  return [creator, guard] as const;
}

// A basic factory for convenience, where you only need to pass in a unique type
// (and the payload shape as a generic, if any)
export function basicFactory<O extends {} | void, T extends string = string>(
  type: T
) {
  function defaultActionCreator(options: O) {
    return {
      type,
      payload: (options || {}) as O,
    };
  }
  return factory(type, defaultActionCreator);
}
