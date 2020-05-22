import dropRepeats from "xstream/extra/dropRepeats";
import {
  GetCountryDataSinks,
  GetCountryDataSources,
} from "./getCountryData.typesOuter";
export * from "./getCountryData.typesOuter";
import intent from "./getCountryData.intent";
import model from "./getCountryData.model";

export function GetCountryData(
  sources: GetCountryDataSources
): GetCountryDataSinks {
  const country$ = sources.state.stream
    .filter((s) => s.state === "loading")
    .map((s) => (s as { country: string }).country)
    .compose(dropRepeats());

  const request$ = country$.map((country) => ({
    url: `https://api.covid19api.com/total/country/${country}`,
    category: "countryData",
  }));

  const action$ = intent(sources);
  const state$ = model(action$);

  return {
    HTTP: request$,
    state: state$.map((s) => () => s),
  };
}

export default GetCountryData;
