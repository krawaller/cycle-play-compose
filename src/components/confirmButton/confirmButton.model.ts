import { Stream } from "xstream";
import { ConfirmButtonMode } from "./confirmButton.types";
import {
  isDisableAction,
  ConfirmButtonAction,
  isMaybeAction,
} from "./confirmButton.actions";

export function model(
  action$: Stream<ConfirmButtonAction>
): Stream<ConfirmButtonMode> {
  return action$.map((action) => {
    if (isDisableAction(action)) {
      return "disabled";
    }
    if (isMaybeAction(action)) {
      return "areyousure";
    }
    // CANCEL, CONFIRM and ENABLE all means we go to waiting mode
    return "waiting";
  });
}

export default model;
