import {span, button, MainDOMSource} from '@cycle/dom';

import isolate from '@cycle/isolate'

import xstream, {Stream} from 'xstream';

type Action = 'DISABLE' | 'ENABLE' | 'MAYBE' | 'CANCEL' | 'CONFIRM';

function intent(sources: {DOM: MainDOMSource, disabled$: Stream<boolean>}) {
  return xstream.merge(
    sources.disabled$.map(i=> i ? 'DISABLE' : 'ENABLE'),
    sources.DOM.select('.maybe').events('click').mapTo('MAYBE'),
    sources.DOM.select('.cancel').events('click').mapTo('CANCEL'),
    sources.DOM.select('.confirm').events('click').mapTo('CONFIRM'),
  ) as Stream<Action>;
}

type State = 'disabled' | 'areyousure' | 'waiting';

function model(action$: Stream<Action>): Stream<State>{
  return action$.map( v => 
    v === 'DISABLE' ? 'disabled'
    : v === 'MAYBE' ? 'areyousure'
    : 'waiting' // because CANCEL, CONFIRM and ENABLE all means we go to waiting mode
  );
}

function view(state$: Stream<State>) {
  return state$.map(state=> {
    return span('.child', [
      state === 'areyousure' ? span('.confirmapp',[
        button('.cancel','Cancel'),
        button('.confirm','Confirm')
      ]) : span('.confirmapp',[
        '','', // prevents DOM driver bug
        button('.maybe',{attrs: {disabled: state === 'disabled'}}, 'Submit')
      ])
    ]);
  });
}

export default isolate( (sources: {DOM: MainDOMSource, disabled$: Stream<boolean>}) => {

  const action$ = intent(sources);
  const state$ = model(action$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    submit$: action$.filter(i => i === 'CONFIRM').mapTo(undefined)
  };
});
