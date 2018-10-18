import {span, button} from '@cycle/dom';

import isolate from '@cycle/isolate'

import xstream from 'xstream';

function intent(sources) {
  return xstream.merge(
    (sources.disabled$ || xstream.create()).map(i=> i ? 'DISABLE' : 'ENABLE'),
    sources.DOM.select('.maybe').events('click').map(i=>'MAYBE'),
    sources.DOM.select('.cancel').events('click').map(i=>'CANCEL'),
    sources.DOM.select('.confirm').events('click').map(i=>'CONFIRM'),
  );
}

function model(action$){
  return action$.map( v => 
    v === 'DISABLE' ? 'disabled'
    : v === 'MAYBE' ? 'areyousure'
    : 'waiting' // because CANCEL, CONFIRM and ENABLE all means we go to waiting mode
  ).startWith('disabled');
}

function view(state$) {
  return state$.map(state=> {
    return span('.child', [
      state === 'areyousure' ? span('.confirmapp',[
        button('.cancel','Cancel'),
        button('.confirm','Confirm')
      ]) : span('.confirmapp',[
        '','', // prevents DOM driver bug
        button('.maybe',{attrs: {disabled: state === 'disabled'}},'Submit')
      ])
    ]);
  });
}

export default isolate( (sources)=> {

  const action$ = intent(sources)
  const state$ = model(action$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$,
    submit$: action$.filter(i => i === 'CONFIRM')
  }
});
