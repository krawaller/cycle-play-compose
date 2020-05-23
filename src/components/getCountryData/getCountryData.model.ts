import { Stream } from "xstream";
import { GetCountryDataInputState } from "./getCountryData.types";
import {
  GetCountryDataAction,
  isSetDataAction,
} from "./getCountryData.actions";

export function model(
  action$: Stream<GetCountryDataAction>
): Stream<GetCountryDataInputState> {
  return action$.map(
    (action): GetCountryDataInputState =>
      isSetDataAction(action)
        ? { state: "data", data: action.payload.data }
        : { state: "error", error: action.payload.error }
  );
}

export default model;
