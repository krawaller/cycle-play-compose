import {
  AssignableInputSources,
  AssignableInputAction,
} from "./assignableInput.types";
import { Stream } from "xstream";

export function intent(
  sources: AssignableInputSources
): Stream<AssignableInputAction> {
  return sources.DOM.select(".field")
    .events("input")
    .filter((e) =>
      Boolean(
        e.target && typeof (e.target as HTMLInputElement).value === "string"
      )
    )
    .map((e: Event) => (e.target as HTMLInputElement).value);
}

export default intent;
