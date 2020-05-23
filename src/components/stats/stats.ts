import { StatsSources, StatsSinks } from "./stats.types";
import view from "./stats.view";

export function Stats(sources: StatsSources): StatsSinks {
  const vdom$ = view(sources.state.stream);
  return {
    DOM: vdom$,
  };
}

export default Stats;
