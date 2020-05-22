import { Lens } from "@cycle/state";
import isolate from "@cycle/isolate";

import GetCountryData, { GetCountryDataInputState } from "./getCountryData";

import { AppState, AppSources } from "./app.types";

const getCountryDataLens: Lens<AppState, GetCountryDataInputState> = {
  get: (state: AppState) => state.data.submittedName,
  set: (oldParentState, newChildState) => oldParentState, // not used
};

export function useGetCountryData(sources: AppSources) {
  return isolate(GetCountryData, {
    state: getCountryDataLens,
  })(sources);
}

export default useGetCountryData;
