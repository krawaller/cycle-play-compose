import xs, { Stream } from "xstream";
import {
  ConfirmButtonAction,
  ConfirmButtonSources,
} from "./confirmButton.types";

export function intent(sources: ConfirmButtonSources) {
  return xs.merge(
    sources.state.stream.map((i) => (i ? "DISABLE" : "ENABLE")),
    sources.DOM.select(".maybe").events("click").mapTo("MAYBE"),
    sources.DOM.select(".cancel").events("click").mapTo("CANCEL"),
    sources.DOM.select(".confirm").events("click").mapTo("CONFIRM")
  ) as Stream<ConfirmButtonAction>;
}

export default intent;
