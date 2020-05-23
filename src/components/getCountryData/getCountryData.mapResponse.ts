import { Response } from "@cycle/http";
import { GetCountryDataAction } from "./getCountryData.types";

export const mapResponse = (res: Response | Error): GetCountryDataAction => {
  if (res instanceof Error) return { type: "setError", error: res.message };
  if (res.error) return { type: "setError", error: res.error.message };
  try {
    const data = res.body;
    if (!Array.isArray(data)) throw new Error();
    if (!data.length)
      return {
        type: "setError",
        error: "The API had no data for this country",
      };
    return { type: "setData", data: data[data.length - 1] }; // latest entry is the newest
  } catch (e) {
    return { type: "setError", error: "Failed to parse response from server" };
  }
};

export default mapResponse;
