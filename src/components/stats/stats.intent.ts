import xs, { Stream } from "xstream";

import { StatsSources } from "./stats.types";
import { StatsAction, clear, reload } from "./stats.actions";

export function intent(sources: StatsSources): Stream<StatsAction> {
  return xs.merge(
    sources.DOM.select(".clearBtn").events("click").mapTo(clear()),
    sources.DOM.select(".reloadBtn").events("click").mapTo(reload())
  );
}

export default intent;
