import { Response } from "@cycle/http";
import {
  GetCountryDataAction,
  setError,
  setData,
} from "./getCountryData.actions";

export const mapResponse = (res: Response | Error): GetCountryDataAction => {
  if (res instanceof Error) return setError({ error: res.message });
  if (res.error) return setError({ error: res.error.message });
  try {
    const data = res.body;
    if (!Array.isArray(data)) throw new Error();
    if (!data.length)
      return setError({ error: "The API had no data for this country" });
    return setData({
      data: data[data.length - 1],
      country: res.request.url.match(/[^\/]*$/)![0],
    }); // latest entry is the newest
  } catch (e) {
    return setError({ error: "Failed to parse response from server" });
  }
};

export default mapResponse;
