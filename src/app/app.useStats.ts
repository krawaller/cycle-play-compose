import { Lens } from "@cycle/state";
import isolate from "@cycle/isolate";

import { AppState, AppSources } from "./app.types";
import { Stats, StatsState } from "../stats";

const statsLens: Lens<AppState, StatsState> = {
  get: (state: AppState) => ({
    country: state.data.submittedName,
    error: (state.data.countryData as { error: string }).error,
    data: (state.data.countryData as { data: any }).data || null,
  }),
  set: (oldParentState: AppState, newChildState: StatsState) => oldParentState, // not used
};

export function useStats(sources: AppSources) {
  return isolate(Stats, { state: statsLens })(sources);
}

export default useStats;
