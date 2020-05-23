import { Stream } from "xstream";
import { ConfirmButtonAction, ConfirmButtonMode } from "./confirmButton.types";

export function model(
  action$: Stream<ConfirmButtonAction>
): Stream<ConfirmButtonMode> {
  return action$.map((v) => {
    switch (v) {
      case "DISABLE":
        return "disabled";
      case "MAYBE":
        return "areyousure";
      // CANCEL, CONFIRM and ENABLE all means we go to waiting mode
      default:
        return "waiting";
    }
  });
}

export default model;
