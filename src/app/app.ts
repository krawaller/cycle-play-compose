import { AppState, AppSinks, AppSources } from "./app.types";
import useForm from "./app.useForm";
import useGetCountryData from "./app.useGetCountryData";
import view from "./app.view";

function App(sources: AppSources) {
  const formSinks = useForm(sources);
  const getCountryDataSinks = useGetCountryData(sources);

  const vdom$ = view(sources, formSinks.DOM, getCountryDataSinks.countryData);

  const initialState: AppState = {
    ui: { fieldContent: "" },
    data: { submittedName: "", countryData: null },
  };

  const sinks: AppSinks = {
    DOM: vdom$,
    state: formSinks.state.startWith(() => initialState),
    HTTP: getCountryDataSinks.HTTP,
  };

  return sinks;
}

export default App;