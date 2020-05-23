import { basicFactory, FetchedCountryData } from "../../common";

export const [setError, isSetErrorAction] = basicFactory<{ error: string }>(
  "GETDATA::ERROR"
);

export const [setData, isSetDataAction] = basicFactory<{
  data: FetchedCountryData;
  country: string;
}>("GETDATA::ERROR");

export type GetCountryDataAction =
  | ReturnType<typeof setError>
  | ReturnType<typeof setData>;
