import { run } from "@cycle/run";
import { div, h1, makeDOMDriver, MainDOMSource, VNode } from "@cycle/dom";
import { withState, StateSource, Reducer, Lens } from "@cycle/state";
import { makeHTTPDriver, HTTPSource, RequestInput } from "@cycle/http";
import isolate from "@cycle/isolate";
import xstream, { Stream } from "xstream";

import Form, { FormState } from "./form";
import CountryData, {
  CountryDataSources,
  CountryDataState,
} from "./countryData";

type AppState = {
  data: {
    submittedName: string;
    countryData: CountryDataState | null;
  };
  ui: {
    fieldContent: string;
  };
};

type AppSources = {
  DOM: MainDOMSource;
  HTTP: HTTPSource;
  state: StateSource<AppState>;
};
type AppSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<AppState>>;
  HTTP: Stream<RequestInput>;
};

function main(sources: AppSources) {
  const formLens: Lens<AppState, FormState> = {
    get: (state: AppState) => ({
      fieldContent: state.ui.fieldContent,
      submittedName: state.data.submittedName,
    }),
    set: (oldParentState: AppState, newChildState: FormState): AppState => ({
      data: {
        submittedName: newChildState.submittedName,
        countryData: oldParentState.data.countryData,
      },
      ui: {
        fieldContent: newChildState.fieldContent,
      },
    }),
  };
  const formSinks = isolate(Form, { state: formLens, "*": "form" })(
    sources
  ) as AppSinks;

  const countryDataLens: Lens<AppState, string> = {
    get: (state: AppState) => state.data.submittedName,
    set: (s) => s,
  };

  const countryDataSinks = isolate(CountryData, {
    state: countryDataLens,
  })(sources);

  const vdom$ = xstream
    .combine(sources.state.stream, formSinks.DOM, countryDataSinks.countryData)
    .map(([appState, nameformvdom, out]) =>
      div([
        h1("Hello " + appState.data.submittedName),
        nameformvdom,
        JSON.stringify(out, null, 2),
      ])
    );

  const initialState: AppState = {
    ui: { fieldContent: "" },
    data: { submittedName: "", countryData: null },
  };

  const sinks: AppSinks = {
    DOM: vdom$,
    state: formSinks.state.startWith(() => initialState),
    HTTP: countryDataSinks.HTTP,
  };

  return sinks;
}

const wrappedMain = withState(main);

const DOM = makeDOMDriver("#app-container");
const HTTP = makeHTTPDriver();

run(wrappedMain, { DOM, HTTP });
