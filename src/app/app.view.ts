import { div, h1, VNode } from "@cycle/dom";
import xs, { Stream } from "xstream";

import { AppSources } from "./app.types";

export function view(sources: AppSources, formvdom$: Stream<VNode>) {
  return xs
    .combine(sources.state.stream, formvdom$)
    .map(([appState, nameformvdom]) =>
      div([
        h1("Hello " + appState.data.submittedName),
        nameformvdom,
        JSON.stringify(appState.data.countryData, null, 2),
      ])
    );
}

export default view;
