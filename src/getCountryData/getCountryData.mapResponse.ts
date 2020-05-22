import { Response } from "@cycle/http";
import { GetCountryDataAction } from "./getCountryData.typesInner";

export const mapResponse = (res: Response | Error): GetCountryDataAction => {
  if (res instanceof Error) return { state: "error", error: res.message };
  if (res.error) return { state: "error", error: res.error.message };
  try {
    const data = res.body;
    if (!Array.isArray(data)) throw new Error();
    if (!data.length)
      return { state: "error", error: "The API had no data for this country" };
    return { state: "data", data: data[data.length - 1] }; // latest entry is the newest
  } catch (e) {
    return { state: "error", error: "Failed to parse response from server" };
  }
};

export default mapResponse;
