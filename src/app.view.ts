import { div, h1, VNode } from "@cycle/dom";
import xstream, { Stream } from "xstream";

import { AppSources, CountryDataState } from "./app.types";

export function view(
  sources: AppSources,
  formvdom$: Stream<VNode>,
  countryData$: Stream<CountryDataState>
) {
  return xstream
    .combine(sources.state.stream, formvdom$, countryData$)
    .map(([appState, nameformvdom, data]) =>
      div([
        h1("Hello " + appState.data.submittedName),
        nameformvdom,
        JSON.stringify(data, null, 2),
      ])
    );
}

export default view;
