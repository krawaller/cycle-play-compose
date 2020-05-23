import { Stream } from "xstream";
import { StateSource, Reducer } from "@cycle/state";
import { VNode, MainDOMSource } from "@cycle/dom";

import { CountryDataState } from "../../common";

export type StatsState = CountryDataState;

export type StatsSources = {
  DOM: MainDOMSource;
  state: StateSource<StatsState>;
};

export type StatsSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<StatsState>>;
};
