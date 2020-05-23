import { MainDOMSource, VNode } from "@cycle/dom";
import { StateSource } from "@cycle/state";
import { Stream } from "xstream";

// We don't actually use this as internal state - instead it is just a signal
// from the outside telling us when to switch from disabled/enabled.
// Our internal state is instead the ConfirmButtonMode type below.
export type ConfirmButtonState = {
  disabled: boolean;
};

export type ConfirmButtonSources = {
  DOM: MainDOMSource;
  state: StateSource<ConfirmButtonState>;
};

// Since the Confirmbutton only uses the input state as a signal,
// it isn't included in the sink.
export type ConfirmButtonSinks = {
  DOM: Stream<VNode>;
  submit$: Stream<undefined>; // clicks on the final confirm button
};

export type ConfirmButtonMode =
  | "areyousure" // Confirming mode, show confirm and cancel buttons
  | "waiting" // Idle mode, show submit button
  | "disabled"; // Idle but disabled
