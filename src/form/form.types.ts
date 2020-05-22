import { MainDOMSource, VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { StateSource, Reducer } from "@cycle/state";

export type FormState = {
  fieldContent: string;
  submittedName: string;
};

export type FormAction = string; // A submitted name

export type FormSources = { DOM: MainDOMSource; state: StateSource<FormState> };

export type FormSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<FormState>>;
};
