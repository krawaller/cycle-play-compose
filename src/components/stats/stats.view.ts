import { div, h1, VNode } from "@cycle/dom";
import { formatDistanceToNow } from "date-fns";

import { StatsState } from "./stats.types";
import { isErrorState, isContentState } from "../../common";
import { Stream } from "xstream";

const box = (label: string, count: number) =>
  div(".statistic", [div(".number", [count]), div(".description", [label])]);

export function view(state$: Stream<StatsState>): Stream<VNode> {
  return state$.map((state) =>
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
}

export default view;
