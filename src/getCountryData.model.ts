import xstream, { Stream } from "xstream";
import {
  GetCountryDataState,
  GetCountryDataAction,
} from "./getCountryData.types";

export function model(
  action$: Stream<GetCountryDataAction>,
  country$: Stream<string>
): Stream<GetCountryDataState> {
  return (
    xstream
      .merge(
        // Whenever we get a new country we flip into loading state
        country$.map((country) => ({ state: "loading", country } as const)),
        // Actions are valid states, so we just switch to them as they come in
        action$
      )
      // From the very beginning we start out in an idle state
      .startWith({ state: "idle" })
  );
}

export default model;
