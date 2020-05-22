import { run } from "@cycle/run";
import { div, h1, makeDOMDriver, MainDOMSource, VNode } from "@cycle/dom";
import { withState, StateSource, Reducer, Lens } from "@cycle/state";
import isolate from "@cycle/isolate";

import Form, { FormState } from "./form";
import xstream, { Stream } from "xstream";

type AppState = {
  data: {
    submittedName: string;
  };
  ui: {
    fieldContent: string;
  };
};

type AppSources = { DOM: MainDOMSource; state: StateSource<AppState> };
type AppSinks = { DOM: Stream<VNode>; state: Stream<Reducer<AppState>> };

function main(sources: AppSources) {
  const formLens: Lens<AppState, FormState> = {
    get: (state: AppState) => ({
      fieldContent: state.ui.fieldContent,
      submittedName: state.data.submittedName,
    }),
    set: (oldParentState: AppState, newChildState: FormState): AppState => ({
      data: {
        submittedName: newChildState.submittedName,
      },
      ui: {
        fieldContent: newChildState.fieldContent,
      },
    }),
  };
  const formSinks = isolate(Form, { state: formLens, "*": "form" })(
    sources
  ) as AppSinks;

  const vdom$ = xstream
    .combine(sources.state.stream, formSinks.DOM)
    .map(([appState, nameformvdom]) =>
      div([h1("Hello " + appState.data.submittedName), nameformvdom])
    );

  const initialState: AppState = {
    ui: { fieldContent: "" },
    data: { submittedName: "John Doe" },
  };
  const initialReducer$: Stream<Reducer<AppState>> = xstream.of(
    (s) => initialState
  );

  const sinks: AppSinks = {
    DOM: vdom$,
    state: xstream.merge(initialReducer$, formSinks.state),
  };

  return sinks;
}

const wrappedMain = withState(main);

const driver = makeDOMDriver("#app-container");

run(wrappedMain, { DOM: driver });
