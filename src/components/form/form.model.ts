import xs, { Stream } from "xstream";
import { FormState, FormAction, FormSources } from "./form.types";
export * from "./form.types";

export function model(
  sources: FormSources,
  action$: Stream<FormAction>
): Stream<FormState> {
  const state$: Stream<FormState> = xs
    .merge(
      sources.state.stream,
      action$.map((action) => ({
        submittedName: action,
        fieldContent: "",
      }))
    )
    .startWith({ submittedName: "", fieldContent: "" });
  return state$;
}

export default model;
