import {run, Driver} from '@cycle/run'
import {div, label, input, hr, h1, makeDOMDriver, VNode, MainDOMSource} from '@cycle/dom'

import Nameform from './nameform';
import xstream, {Stream} from 'xstream';

function main(sources: { DOM: MainDOMSource }) {
  const nameformSinks = Nameform({ DOM: sources.DOM });

  const vdom$ = xstream.combine(nameformSinks.name$.startWith(''), nameformSinks.DOM).map(([name, nameformvdom]) =>
    div([
      h1('Hello ' + name),
      nameformvdom
    ])
  );

  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') });
