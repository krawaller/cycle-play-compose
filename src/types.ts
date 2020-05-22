// Types that are of global interest to the app

export type AppState = {
  data: {
    submittedName: string;
    countryData: CountryDataState | null;
  };
  ui: {
    fieldContent: string;
  };
};

export type CountryDataState =
  | { state: "idle" }
  | { state: "loading"; country: string }
  | { state: "error"; error: string }
  | { state: "data"; data: FetchedCountryData };

export type FetchedCountryData = {
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
};
