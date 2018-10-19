import {run} from '@cycle/run';
import {div, h1, makeDOMDriver, MainDOMSource, VNode} from '@cycle/dom';
import {withState, StateSource, Reducer} from '@cycle/state';

import Form from './form';
import xstream, {Stream} from 'xstream';

type AppState = {
  submittedName: string
};

type AppSources = { DOM: MainDOMSource, state: StateSource<AppState> }
type AppSinks = { DOM: Stream<VNode>, state: Stream<Reducer<AppState>> }


function main(sources: AppSources) {
  const formSinks = Form({
    DOM: sources.DOM,
    name$: sources.state.stream.map(s => s.submittedName)
  });

  const vdom$ = xstream.combine(sources.state.stream, formSinks.DOM).map(([appState, nameformvdom]) =>
    div([
      h1('Hello ' + appState.submittedName),
      nameformvdom
    ])
  );

  const initialReducer$: Stream<Reducer<AppState>> = xstream.of((s) => ({ ...s, submittedName: 'John Doe'}));
  const newNameReducer$: Stream<Reducer<AppState>> = formSinks.name$.map(v => (s) => ({ ...s, submittedName: v }));

  const sinks: AppSinks = {
    DOM: vdom$,
    state: xstream.merge(
      initialReducer$,
      newNameReducer$
    )
  };

  return sinks;
}

const wrappedMain = withState(main);

const driver = makeDOMDriver('#app-container')

// @ts-ignore
run(wrappedMain, { DOM: driver });
