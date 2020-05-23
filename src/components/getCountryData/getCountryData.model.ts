import { Stream } from "xstream";
import {
  GetCountryDataInputState,
  GetCountryDataAction,
} from "./getCountryData.types";

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
