import { Stream } from "xstream";
import { StateSource } from "@cycle/state";

import { FetchedCountryData } from "../app/app.types";
import { VNode } from "@cycle/dom";

export type StatsState = {
  country: string;
  data?: FetchedCountryData | null;
  error?: string;
};

export type StatsSources = {
  state: StateSource<StatsState>;
};

export type StatsSinks = {
  DOM: Stream<VNode>;
};
