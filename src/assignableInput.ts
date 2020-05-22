import {
  AssignableInputSinks,
  AssignableInputSources,
  AssignableInputState,
} from "./assignableInput.types";
export * from "./assignableInput.types";

import intent from "./assignableInput.intent";
import view from "./assignableInput.view";
import model from "./assignableInput.model";
import { Stream } from "xstream";
import { Reducer } from "@cycle/state";

export default function AssignableInput(
  sources: AssignableInputSources
): AssignableInputSinks {
  const action$ = intent(sources);
  const state$ = model(sources, action$);
  const vtree$ = view(state$);

  const reducer$: Stream<Reducer<
    AssignableInputState
  >> = action$.map((newName) => () => newName);

  return {
    DOM: vtree$,
    state: reducer$,
  };
}
