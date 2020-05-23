export type FetchedCountryData = {
  Country: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
};

export type CountryDataErrorState = { state: "error"; error: string };
export type CountryDataIdleState = { state: "idle" };
export type CountryDataLoadingState = {
  state: "loading";
  country: string;
  force?: boolean;
};
export type CountryDataContentState = {
  state: "data";
  country: string;
  data: FetchedCountryData;
};

export type CountryDataState =
  | CountryDataErrorState
  | CountryDataIdleState
  | CountryDataLoadingState
  | CountryDataContentState;

export const isErrorState = (s: CountryDataState): s is CountryDataErrorState =>
  s.state === "error";

export const isLoadingState = (
  s: CountryDataState
): s is CountryDataLoadingState => s.state === "loading";

export const isIdleState = (s: CountryDataState): s is CountryDataIdleState =>
  s.state === "idle";

export const isContentState = (
  s: CountryDataState
): s is CountryDataContentState => s.state === "data";
