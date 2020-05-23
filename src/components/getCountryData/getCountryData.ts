import {
  GetCountryDataSinks,
  GetCountryDataSources,
} from "./getCountryData.types";
import intent from "./getCountryData.intent";
import model from "./getCountryData.model";
import request from "./getCountryData.request";

export function GetCountryData(
  sources: GetCountryDataSources
): GetCountryDataSinks {
  const action$ = intent(sources);
  const state$ = model(action$);
  const request$ = request(sources);

  return {
    HTTP: request$,
    state: state$.map((s) => () => s),
  };
}

export default GetCountryData;
