import {run} from '@cycle/run'
import {div, label, input, hr, h1, makeDOMDriver} from '@cycle/dom'

import Nameform from './nameform';
import xstream from 'xstream';

function main(sources) {
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
