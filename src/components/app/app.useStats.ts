import produce from "immer";
import { Lens, Reducer } from "@cycle/state";
import isolate from "@cycle/isolate";

import { AppState, AppSources } from "./app.types";
import { Stats, StatsState } from "../stats";
import { Stream } from "xstream";

const statsLens: Lens<AppState, StatsState> = {
  get: (state: AppState) => state.data.countryData,
  set: (oldParentState: AppState, newChildState: StatsState) =>
    produce(oldParentState, (draft) => {
      draft.data.countryData = newChildState;
    }),
};

export function useStats(sources: AppSources) {
  const sinks = isolate(Stats, { state: statsLens })(sources);
  return {
    ...sinks,
    // Types get wrangled somehow
    state: sinks.state as Stream<Reducer<AppState>>,
  };
}

export default useStats;
