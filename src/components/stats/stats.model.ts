import { Stream } from "xstream";
import sampleCombine from "xstream/extra/sampleCombine";
import { StatsAction, isReloadAction } from "./stats.actions";
import { StatsState } from "./stats.types";
import { CountryDataContentState } from "../../common";

export function model(
  action$: Stream<StatsAction>,
  state$: Stream<StatsState>
): Stream<StatsState> {
  return action$.compose(sampleCombine(state$)).map(
    ([action, currentState]): StatsState =>
      isReloadAction(action)
        ? {
            state: "loading",
            country: (currentState as CountryDataContentState).country,
            force: true,
          }
        : { state: "idle" }
  );
}

export default model;
