import { span, button } from "@cycle/dom";
import { Stream } from "xstream";
import { ConfirmButtonMode } from "./confirmButton.types";

export function view(state$: Stream<ConfirmButtonMode>) {
  return state$.map((state) => {
    return span(".child", [
      state === "areyousure"
        ? span(".confirmbutton", [
            button(".cancel", { key: "cancel" }, "Cancel"),
            button(".confirm", { key: "confirm" }, "Confirm"),
          ])
        : span(".confirmbutton", [
            button(
              ".maybe",
              { attrs: { key: "submit", disabled: state === "disabled" } },
              "Submit"
            ),
          ]),
    ]);
  });
}

export default view;
