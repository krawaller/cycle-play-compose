import xs, { Stream } from "xstream";
import { Reducer } from "@cycle/state";

import intent from "./form.intent";
import view from "./form.view";
import model from "./form.model";
import useConfirmButton from "./form.useConfirmButton";
import useAssignableInput from "./form.useAssignableInput";
import { FormSinks, FormSources, FormState } from "./form.types";
export * from "./form.types";

export function Form(sources: FormSources): FormSinks {
  const assignableInputSinks = useAssignableInput(sources);
  const confirmButtonSinks = useConfirmButton(sources);

  const action$ = intent(sources, confirmButtonSinks.submit$);
  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);
  const model$ = model(action$);

  const defaultReducer$: Stream<Reducer<FormState>> = xs.of(
    (s) => s || { submittedName: "", fieldContent: "" }
  );
  const submitReducer$: Stream<Reducer<FormState>> = model$.map((s) => () => s);

  return {
    DOM: vtree$,
    state: xs.merge(
      defaultReducer$,
      assignableInputSinks.state,
      submitReducer$
    ),
  };
}

export default Form;
