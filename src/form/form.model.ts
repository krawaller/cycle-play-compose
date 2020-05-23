import { Stream } from "xstream";
import { FormState, FormAction } from "./form.types";
export * from "./form.types";

export function model(action$: Stream<FormAction>): Stream<FormState> {
  const state$: Stream<FormState> = action$.map((action) => ({
    submittedName: action,
    fieldContent: "",
  }));
  return state$;
}

export default model;
