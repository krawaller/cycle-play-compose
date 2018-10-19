import {span, button, MainDOMSource} from '@cycle/dom';
import {StateSource} from '@cycle/state';
import xstream, {Stream} from 'xstream';

type ConfirmButtonSources = {DOM: MainDOMSource, state: StateSource<boolean>};

type Action = 'DISABLE' | 'ENABLE' | 'MAYBE' | 'CANCEL' | 'CONFIRM';

function intent(sources: ConfirmButtonSources) {
  return xstream.merge(
    sources.state.stream.map(i=> i ? 'DISABLE' : 'ENABLE'),
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
  return state$.map(state => {
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

export default (sources: ConfirmButtonSources) => {

  const action$ = intent(sources);
  const state$ = model(action$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$,
    submit$: action$.filter(i => i === 'CONFIRM').mapTo(undefined)
  };
};
