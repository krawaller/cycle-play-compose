import { Lens } from "@cycle/state";
import isolate from "@cycle/isolate";

import { AppState, AppSinks, AppSources } from "./app.types";
import Form, { FormState } from "./form";

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
  return isolate(Form, { state: formLens, "*": "form" })(sources) as AppSinks;
}

export default useForm;
