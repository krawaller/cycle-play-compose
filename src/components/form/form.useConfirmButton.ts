import isolate from "@cycle/isolate";
import { ConfirmButton, ConfirmButtonState } from "../confirmButton";
import { Lens } from "@cycle/state";
import { FormSources, FormState } from "./form.types";

const confirmButtonLens: Lens<FormState, ConfirmButtonState> = {
  get: (s: FormState) => ({ disabled: !s.fieldContent }),
  set: (oldFormState) => oldFormState, // this isn't used
};

export function useConfirmButton(sources: FormSources) {
  return isolate(ConfirmButton, {
    state: confirmButtonLens,
  })(sources);
}

export default useConfirmButton;
