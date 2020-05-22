import xstream, { Stream } from "xstream";
import {
  GetCountryDataState,
  GetCountryDataAction,
} from "./getCountryData.typesInner";

export function model(
  action$: Stream<GetCountryDataAction>,
  country$: Stream<string>
): Stream<GetCountryDataState> {
  return (
    xstream
      .merge(
        // Whenever we get a new country we flip into loading state
        country$.map(
          (country): GetCountryDataState => ({ state: "loading", country })
        ),
        // Actions are valid states, so we just switch to them as they come in
        action$.map(
          (action): GetCountryDataState =>
            action.type === "setError"
              ? { state: "error", error: action.error }
              : { state: "data", data: action.data }
        )
      )
      // From the very beginning we start out in an idle state
      .startWith({ state: "idle" })
  );
}

export default model;
