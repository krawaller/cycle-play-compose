import xs, { Stream } from "xstream";

import {
  AssignableInputSources,
  AssignableInputAction,
} from "./assignableInput.types";

export function model(
  sources: AssignableInputSources,
  action$: Stream<AssignableInputAction>
) {
  return xs.merge(
    action$, // stream of stuff typed by the user
    sources.state.stream // stream of assignments from parent
  );
}

export default model;
