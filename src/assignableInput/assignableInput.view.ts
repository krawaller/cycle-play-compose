import { input } from "@cycle/dom";
import { Stream } from "xstream";

export default function view(state$: Stream<string>) {
  return state$.map((state) =>
    input(".field", { attrs: { type: "text" }, props: { value: state } })
  );
}
