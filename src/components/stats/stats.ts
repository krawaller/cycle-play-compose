import { StatsSources, StatsSinks } from "./stats.types";
import view from "./stats.view";
import model from "./stats.model";
import intent from "./stats.intent";

export function Stats(sources: StatsSources): StatsSinks {
  const vdom$ = view(sources.state.stream);
  const action$ = intent(sources);
  const newState$ = model(action$, sources.state.stream);
  return {
    DOM: vdom$,
    state: newState$.map((s) => () => s),
  };
}

export default Stats;
