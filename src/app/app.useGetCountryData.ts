import produce from "immer";
import { Lens, Reducer } from "@cycle/state";
import isolate from "@cycle/isolate";

import GetCountryData, {
  GetCountryDataInputState,
} from "../getCountryData/getCountryData";

import { AppState, AppSources } from "./app.types";
import { Stream } from "xstream";

const getCountryDataLens: Lens<AppState, GetCountryDataInputState> = {
  get: (state: AppState) => state.data.countryData,
  set: (oldParentState: AppState, newChildState) =>
    produce(oldParentState, (draft) => {
      draft.data.countryData = newChildState!;
    }),
};

export function useGetCountryData(sources: AppSources) {
  const sinks = isolate(GetCountryData, {
    state: getCountryDataLens,
  })(sources);
  return {
    ...sinks,
    // Types get wrangled somehow
    state: sinks.state as Stream<Reducer<AppState>>,
  };
}

export default useGetCountryData;
