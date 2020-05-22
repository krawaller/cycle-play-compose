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
  const country$ = sources.state.stream.drop(1); // first emission is just empty string
  const request$ = country$.map((country) => ({
    url: `https://api.covid19api.com/total/country/${country}`,
    category: "countryData",
  }));

  const action$ = intent(sources);
  const state$ = model(action$, country$);

  return {
    HTTP: request$,
    countryData: state$,
  };
}

export default GetCountryData;
