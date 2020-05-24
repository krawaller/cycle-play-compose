import xs, { Stream } from "xstream";
import dropRepeats from "xstream/extra/dropRepeats";
import { ConfirmButtonSources } from "./confirmButton.types";
import {
  enable,
  disable,
  maybe,
  cancel,
  confirm,
  ConfirmButtonAction,
} from "./confirmButton.actions";

export function intent(
  sources: ConfirmButtonSources
): Stream<ConfirmButtonAction> {
  return xs.merge(
    sources.state.stream
      .map((s) => s.disabled)
      .compose(dropRepeats())
      .map((disabledBool) => (disabledBool ? disable() : enable())),
    sources.DOM.select(".maybe").events("click").mapTo(maybe()),
    sources.DOM.select(".cancel").events("click").mapTo(cancel()),
    sources.DOM.select(".confirm").events("click").mapTo(confirm())
  ) as Stream<ConfirmButtonAction>;
}

export default intent;
