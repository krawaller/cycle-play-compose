import { Stream } from "xstream";
import { StateSource } from "@cycle/state";
import { VNode } from "@cycle/dom";

import { CountryDataState } from "../../common";

export type StatsState = CountryDataState;

export type StatsSources = {
  state: StateSource<StatsState>;
};

export type StatsSinks = {
  DOM: Stream<VNode>;
};
