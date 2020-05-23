import { div, h1 } from "@cycle/dom";
import { formatDistanceToNow } from "date-fns";

import { StatsSources, StatsSinks } from "./stats.types";
import { isErrorState, isContentState } from "../../common";

const box = (label: string, count: number) =>
  div(".statistic", [div(".number", [count]), div(".description", [label])]);

export function Stats(sources: StatsSources): StatsSinks {
  const vdom$ = sources.state.stream.map((state) =>
    isErrorState(state)
      ? h1(".title", [state.error])
      : isContentState(state)
      ? div([
          h1(".title", [state.data.Country]),
          div(".ago", [
            "updated ",
            formatDistanceToNow(new Date(state.data.Date)),
            " ago",
          ]),
          div(".statsContainer", [
            box("Confirmed", state.data.Confirmed),
            box("Deaths", state.data.Deaths),
            box("Recovered", state.data.Recovered),
            box("Active", state.data.Active),
          ]),
        ])
      : div()
  );
  return {
    DOM: vdom$,
  };
}

export default Stats;
