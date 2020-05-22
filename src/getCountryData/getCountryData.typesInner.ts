import { CountryDataState, FetchedCountryData } from "../app/app.types";

export type GetCountryDataState = CountryDataState;

export type GetCountryDataAction =
  | { type: "setData"; data: FetchedCountryData }
  | { type: "setError"; error: string };
