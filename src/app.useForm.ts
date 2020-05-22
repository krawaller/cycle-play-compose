import { Lens, Reducer } from "@cycle/state";
import isolate from "@cycle/isolate";

import { AppState, AppSources } from "./app.types";
import Form, { FormState } from "./form";
import { Stream } from "xstream";

const formLens: Lens<AppState, FormState> = {
  get: (state: AppState) => ({
    fieldContent: state.ui.fieldContent,
    submittedName: state.data.submittedName,
  }),
  set: (oldParentState: AppState, newChildState: FormState): AppState => ({
    data: {
      submittedName: newChildState.submittedName,
      countryData: oldParentState.data.countryData,
    },
    ui: {
      fieldContent: newChildState.fieldContent,
    },
  }),
};

export function useForm(sources: AppSources) {
  const formSinks = isolate(Form, { state: formLens, "*": "form" })(sources);
  return {
    ...formSinks,
    // Types get mangled somehow
    state: formSinks.state as Stream<Reducer<AppState>>,
  };
}

export default useForm;
