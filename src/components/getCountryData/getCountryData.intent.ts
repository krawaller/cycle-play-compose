import xs, { Stream } from "xstream";
import { GetCountryDataSources } from "./getCountryData.types";

import { GetCountryDataAction } from "./getCountryData.actions";
import mapResponse from "./getCountryData.mapResponse";

export function intent(
  sources: GetCountryDataSources
): Stream<GetCountryDataAction> {
  return sources.HTTP.select("countryData")
    .map((response$) =>
      // catch errors and include them in the stream
      response$.replaceError((error) => xs.of({ error } as any))
    )
    .flatten() // this is a stream of streams, so we flatten into a single stream
    .map(mapResponse); // convert network responses into proper actions
}

export default intent;
