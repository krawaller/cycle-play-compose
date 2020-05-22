import { Stream } from "xstream";
import { GetCountryDataAction } from "./getCountryData.typesInner";
import { GetCountryDataInputState } from "./getCountryData.typesOuter";

export function model(
  action$: Stream<GetCountryDataAction>
): Stream<GetCountryDataInputState> {
  return action$.map(
    (action): GetCountryDataInputState =>
      action.type === "setError"
        ? { state: "error", error: action.error }
        : { state: "data", data: action.data }
  );
}

export default model;
