import {run} from '@cycle/run';
import {div, h1, makeDOMDriver, MainDOMSource, VNode, s} from '@cycle/dom';
import {withState, StateSource, Reducer} from '@cycle/state';

import Nameform from './nameForm';
import xstream, {Stream} from 'xstream';

type AppState = {
  submittedName: string
};

function main(sources: { DOM: MainDOMSource, state: StateSource<AppState> }) {
  const nameformSinks = Nameform({
    DOM: sources.DOM,
    assign$: sources.state.stream.map(s => s.submittedName)
  });

  const vdom$ = xstream.combine(sources.state.stream, nameformSinks.DOM).map(([appState, nameformvdom]) =>
    div([
      h1('Hello ' + appState.submittedName),
      nameformvdom
    ])
  );

  const sinks: { DOM: Stream<VNode>, state: Stream<Reducer<AppState>> } = {
    DOM: vdom$,
    // @ts-ignore
    state: xstream.merge(
      xstream.of((s: AppState) => ({ ...s, submittedName: 'John Doe'}) as AppState),
      nameformSinks.name$.map(v => (s: AppState) => ({ ...s, submittedName: v }) as AppState)
    )
  };

  return sinks;
}

const wrappedMain = withState(main);

const driver = makeDOMDriver('#app-container')

// @ts-ignore
run(wrappedMain, { DOM: driver });
