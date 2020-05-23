import xs, { Stream } from "xstream";
import dropRepeats from "xstream/extra/dropRepeats";
import {
  ConfirmButtonAction,
  ConfirmButtonSources,
} from "./confirmButton.types";

export function intent(
  sources: ConfirmButtonSources
): Stream<ConfirmButtonAction> {
  return xs.merge(
    sources.state.stream
      .map((i) => (i.disabled ? "DISABLE" : "ENABLE"))
      .compose(dropRepeats()),
    sources.DOM.select(".maybe").events("click").mapTo("MAYBE"),
    sources.DOM.select(".cancel").events("click").mapTo("CANCEL"),
    sources.DOM.select(".confirm").events("click").mapTo("CONFIRM")
  ) as Stream<ConfirmButtonAction>;
}

export default intent;
