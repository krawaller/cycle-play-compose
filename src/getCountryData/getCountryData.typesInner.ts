import { FetchedCountryData } from "../app/app.types";

export type GetCountryDataAction =
  | { type: "setData"; data: FetchedCountryData }
  | { type: "setError"; error: string };
