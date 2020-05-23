import { MainDOMSource, VNode } from "@cycle/dom";
import { StateSource } from "@cycle/state";
import { Stream } from "xstream";

export type ConfirmButtonSources = {
  DOM: MainDOMSource;
  state: StateSource<boolean>; // whether or not we are disabled
};

export type ConfirmButtonSinks = {
  DOM: Stream<VNode>;
  submit$: Stream<undefined>; // clicks on the final confirm button
};

export type ConfirmButtonAction =
  | "DISABLE"
  | "ENABLE"
  | "MAYBE" // This is the first click
  | "CANCEL"
  | "CONFIRM";

export type ConfirmButtonMode =
  | "areyousure" // Confirming mode, show confirm and cancel buttons
  | "waiting" // Idle mode, show submit button
  | "disabled"; // Idle but disabled
