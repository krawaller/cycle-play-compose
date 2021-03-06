import { MainDOMSource, VNode } from "@cycle/dom";
import { StateSource, Reducer } from "@cycle/state";
import { HTTPSource, RequestInput } from "@cycle/http";
import { Stream } from "xstream";

import { CountryDataState } from "../../common/types";

export type AppSources = {
  DOM: MainDOMSource;
  HTTP: HTTPSource;
  state: StateSource<AppState>;
};

export type AppSinks = {
  DOM: Stream<VNode>;
  state: Stream<Reducer<AppState>>;
  HTTP: Stream<RequestInput>;
};

export type AppState = {
  data: {
    submittedName: string;
    countryData: CountryDataState;
  };
  ui: {
    fieldContent: string;
  };
};
