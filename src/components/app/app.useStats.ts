import produce from "immer";
import { Lens } from "@cycle/state";
import isolate from "@cycle/isolate";

import { AppState, AppSources } from "./app.types";
import { Stats, StatsState } from "../stats";

const statsLens: Lens<AppState, StatsState> = {
  get: (state: AppState) => state.data.countryData,
  set: (oldParentState: AppState, newChildState: StatsState) =>
    produce(oldParentState, (draft) => {
      draft.data.countryData = newChildState;
    }),
};

export function useStats(sources: AppSources) {
  return isolate(Stats, { state: statsLens })(sources);
}

export default useStats;
