import { HTTPSource, RequestInput } from "@cycle/http";
import { Stream } from "xstream";
import { StateSource, Reducer } from "@cycle/state";

import { CountryDataState } from "../app/app.types";

export type GetCountryDataInputState = CountryDataState;

import { FetchedCountryData } from "../app/app.types";

export type GetCountryDataAction =
  | { type: "setData"; data: FetchedCountryData }
  | { type: "setError"; error: string };

export type GetCountryDataSources = {
  HTTP: HTTPSource;
  state: StateSource<GetCountryDataInputState>;
};

export type GetCountryDataSinks = {
  HTTP: Stream<RequestInput>;
  state: Stream<Reducer<GetCountryDataInputState>>;
};
