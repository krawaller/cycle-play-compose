import { HTTPSource, RequestInput } from "@cycle/http";
import { Stream } from "xstream";
import { StateSource } from "@cycle/state";

import { GetCountryDataState } from "./getCountryData.typesInner";

export type GetCountryDataInputState = string; // Stream of country names to load

export type GetCountryDataSources = {
  HTTP: HTTPSource;
  state: StateSource<GetCountryDataInputState>;
};

export type GetCountryDataSinks = {
  HTTP: Stream<RequestInput>;
  countryData: Stream<GetCountryDataState>;
};
