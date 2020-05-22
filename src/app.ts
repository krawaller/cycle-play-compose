import { div, h1 } from "@cycle/dom";
import { Lens } from "@cycle/state";
import isolate from "@cycle/isolate";
import xstream from "xstream";

import GetCountryData from "./getCountryData";

import { AppState, AppSinks, AppSources } from "./app.types";
import useForm from "./app.useForm";

function App(sources: AppSources) {
  const formSinks = useForm(sources);

  const getCountryDataLens: Lens<AppState, string> = {
    get: (state: AppState) => state.data.submittedName,
    set: (s) => s,
  };

  const getCountryDataSinks = isolate(GetCountryData, {
    state: getCountryDataLens,
  })(sources);

  const vdom$ = xstream
    .combine(
      sources.state.stream,
      formSinks.DOM,
      getCountryDataSinks.countryData
    )
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
    HTTP: getCountryDataSinks.HTTP,
  };

  return sinks;
}

export default App;
