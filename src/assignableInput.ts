import { input, MainDOMSource, VNode } from "@cycle/dom";
import isolate from "@cycle/isolate";
import xstream, { Stream } from "xstream";
import { StateSource, Reducer } from "@cycle/state";

type AssignableInputState = string;

export type AssignableInputSources = {
  DOM: MainDOMSource;
  state: StateSource<AssignableInputState>;
};
export type AssignableInputSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<AssignableInputState>>;
};

export default function AssignableInput(
  sources: AssignableInputSources
): AssignableInputSinks {
  const newValue$ = sources.DOM.select(".field")
    .events("input")
    .map((e: Event) => e && e.target && (e.target as HTMLInputElement).value);

  const state$ = xstream.merge(newValue$, sources.state.stream);

  const vtree$ = state$.map((state) =>
    input(".field", { attrs: { type: "text" }, props: { value: state } })
  );

  return {
    DOM: vtree$,
    state: newValue$.map((newName) => () => newName as AssignableInputState),
  };
}
