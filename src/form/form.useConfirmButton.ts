import isolate from "@cycle/isolate";
import { ConfirmButton } from "../confirmButton/confirmButton";
import { Lens } from "@cycle/state";
import { FormSources, FormState } from "./form.types";

const confirmButtonLens: Lens<FormState, boolean> = {
  get: (s: FormState) => !s.fieldContent,
  set: (oldFormState) => oldFormState, // this isn't used
};

export function useConfirmButton(sources: FormSources) {
  return isolate(ConfirmButton, {
    state: confirmButtonLens,
  })(sources);
}

export default useConfirmButton;
