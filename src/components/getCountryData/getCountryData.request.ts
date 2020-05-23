import { RequestInput } from "@cycle/http";
import dropRepeats from "xstream/extra/dropRepeats";
import { GetCountryDataSources } from "./getCountryData.types";
import { Stream } from "xstream";
import { isLoadingState } from "../../common";

export function request(sources: GetCountryDataSources): Stream<RequestInput> {
  // Convert the input state stream to a stream of countries to be loaded
  const country$ = sources.state.stream
    .filter(isLoadingState)
    .compose(dropRepeats((s1, s2) => !s1.force && s1.country === s2.country))
    .map((s) => (s as { country: string }).country);

  // Turn those countries into proper request objects
  const request$ = country$.map((country) => ({
    url: `https://api.covid19api.com/total/country/${country}`,
    category: "countryData",
  }));

  return request$;
}

export default request;
