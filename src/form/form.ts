import xstream, { Stream } from "xstream";
import { Reducer } from "@cycle/state";

import intent from "./form.intent";
import view from "./form.view";
import useConfirmButton from "./form.useConfirmButton";
import useAssignableInput from "./form.useAssignableInput";
import { FormSinks, FormSources, FormState } from "./form.types";
export * from "./form.types";

function Form(sources: FormSources): FormSinks {
  const assignableInputSinks = useAssignableInput(sources);

  const confirmButtonSinks = useConfirmButton(sources);

  const submittedName$ = intent(sources, confirmButtonSinks.submit$);

  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);

  const defaultReducer$: Stream<Reducer<FormState>> = xstream.of(
    (s) => s || { submittedName: "", fieldContent: "" }
  );
  const submitReducer$: Stream<Reducer<FormState>> = submittedName$.map(
    (newName) => () => ({
      submittedName: newName,
      fieldContent: "",
    })
  );

  return {
    DOM: vtree$,
    state: xstream.merge(
      defaultReducer$,
      assignableInputSinks.state,
      submitReducer$
    ),
  };
}

export default Form;
