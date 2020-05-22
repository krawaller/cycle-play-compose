import { run } from "@cycle/run";
import { makeDOMDriver } from "@cycle/dom";
import { withState } from "@cycle/state";
import { makeHTTPDriver } from "@cycle/http";

import App from "./app/app";

const DOM = makeDOMDriver("#app-container");
const HTTP = makeHTTPDriver();

run(withState(App), { DOM, HTTP });
