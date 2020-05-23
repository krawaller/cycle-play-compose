import { HTTPSource, RequestInput } from "@cycle/http";
import { Stream } from "xstream";
import { StateSource, Reducer } from "@cycle/state";

import { CountryDataState } from "../../common";

export type GetCountryDataInputState = CountryDataState;

export type GetCountryDataSources = {
  HTTP: HTTPSource;
  state: StateSource<GetCountryDataInputState>;
};

export type GetCountryDataSinks = {
  HTTP: Stream<RequestInput>;
  state: Stream<Reducer<GetCountryDataInputState>>;
};
