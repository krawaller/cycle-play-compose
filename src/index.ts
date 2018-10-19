import {run} from '@cycle/run';
import {div, h1, makeDOMDriver, MainDOMSource, VNode} from '@cycle/dom';
import {withState, StateSource, Reducer, Lens} from '@cycle/state';
import isolate from '@cycle/isolate';

import Form, { FormState } from './form';
import xstream, {Stream} from 'xstream';

type AppState = {
  submittedName: string,
  form: {
    fieldContent: string
  }
};

type AppSources = { DOM: MainDOMSource, state: StateSource<AppState> }
type AppSinks = { DOM: Stream<VNode>, state: Stream<Reducer<AppState>> }


function main(sources: AppSources) {
  const formLens: Lens<AppState, FormState> = {
    get: (state: AppState) => ({ fieldContent: state.form.fieldContent, submittedName: state.submittedName }),
    set: (oldParentState: AppState, newChildState: FormState) => ({
      ...oldParentState,
      submittedName: newChildState.submittedName,
      form: {
        fieldContent: newChildState.fieldContent
      }
    })
  };
  const formSinks = isolate(Form, {state: formLens, '*': 'form'})(sources) as AppSinks;

  const vdom$ = xstream.combine(sources.state.stream, formSinks.DOM).map(([appState, nameformvdom]) =>
    div([
      h1('Hello ' + appState.submittedName),
      nameformvdom
    ])
  );

  const initialReducer$: Stream<Reducer<AppState>> = xstream.of((s) => ({ form: {fieldContent: ''}, submittedName: 'John Doe'}));

  const sinks: AppSinks = {
    DOM: vdom$,
    state: xstream.merge(
      initialReducer$,
      formSinks.state
    )
  };

  return sinks;
}

const wrappedMain = withState(main);

const driver = makeDOMDriver('#app-container')

// @ts-ignore
run(wrappedMain, { DOM: driver });
