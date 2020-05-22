import {
  AssignableInputSinks,
  AssignableInputSources,
  AssignableInputState,
} from "./assignableInput.types";

import intent from "./assignableInput.intent";
import view from "./assignableInput.view";
import model from "./assignableInput.model";

export default function AssignableInput(
  sources: AssignableInputSources
): AssignableInputSinks {
  const action$ = intent(sources);
  const state$ = model(sources, action$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    state: action$.map((newName) => () => newName as AssignableInputState),
  };
}
