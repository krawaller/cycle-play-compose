import {input} from '@cycle/dom';
import isolate from '@cycle/isolate'
import xstream from 'xstream';

export default isolate((sources) => {

  const newValue$ = sources.DOM
    .select('.field').events('input')
    .map(e => e.target.value);
  
  const value$ = xstream.merge(newValue$, sources.assign$.startWith(''));

  const vtree$ = value$.map(state => input('.field', {attrs: {type: 'text'}, props:{value: state}}));

  return { DOM: vtree$, value$: newValue$.startWith('') };
});
