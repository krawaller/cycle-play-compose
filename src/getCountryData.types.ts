import { HTTPSource, RequestInput } from "@cycle/http";
import { Stream } from "xstream";
import { StateSource } from "@cycle/state";
import { CountryDataState } from "./types";

export type GetCountryDataSources = {
  HTTP: HTTPSource;
  state: StateSource<string>; // Stream of country names to load
};

export type GetCountryDataSinks = {
  HTTP: Stream<RequestInput>;
  countryData: Stream<CountryDataState>;
};

export type GetCountryDataState = CountryDataState;

export type GetCountryDataAction = CountryDataState;
