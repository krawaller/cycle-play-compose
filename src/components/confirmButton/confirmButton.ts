import {
  ConfirmButtonSources,
  ConfirmButtonSinks,
} from "./confirmButton.types";
import intent from "./confirmButton.intent";
import model from "./confirmButton.model";
import view from "./confirmButton.view";

export function ConfirmButton(
  sources: ConfirmButtonSources
): ConfirmButtonSinks {
  const action$ = intent(sources);
  const state$ = model(action$);
  const vtree$ = view(state$);

  const submit$ = action$.filter((i) => i === "CONFIRM").mapTo(undefined);

  return {
    DOM: vtree$,
    submit$,
  };
}
