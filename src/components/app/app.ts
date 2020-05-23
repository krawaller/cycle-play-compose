import xs from "xstream";
import { AppState, AppSinks, AppSources } from "./app.types";
import useForm from "./app.useForm";
import useGetCountryData from "./app.useGetCountryData";
import useStats from "./app.useStats";
import view from "./app.view";

export function App(sources: AppSources) {
  const formSinks = useForm(sources);
  const statsSinks = useStats(sources);
  const getCountryDataSinks = useGetCountryData(sources);

  const vdom$ = view(formSinks.DOM, statsSinks.DOM);

  const initialState: AppState = {
    ui: { fieldContent: "" },
    data: { submittedName: "", countryData: { state: "idle" } },
  };

  const sinks: AppSinks = {
    DOM: vdom$,
    state: xs
      .merge(formSinks.state, getCountryDataSinks.state, statsSinks.state)
      .startWith(() => initialState),
    HTTP: getCountryDataSinks.HTTP,
  };

  return sinks;
}

export default App;
