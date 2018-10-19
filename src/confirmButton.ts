import {span, button, MainDOMSource} from '@cycle/dom';
import {StateSource, Reducer, withState} from '@cycle/state';
import xstream, {Stream} from 'xstream';



type ConfirmState = 'disabled' | 'areyousure' | 'waiting';

type NakedConfirmButtonSources = {DOM: MainDOMSource, state: StateSource<ConfirmState>};

function intent(sources: NakedConfirmButtonSources) {
  return {
    maybe$: sources.DOM.select('.maybe').events('click'),
    cancel$: sources.DOM.select('.cancel').events('click'),
    confirm$: sources.DOM.select('.confirm').events('click'),
  };
}

function reducer({maybe$, cancel$, confirm$}): Stream<Reducer<ConfirmState>> {
  return xstream.merge(
    maybe$.mapTo(() => 'areyousure'),
    cancel$.mapTo(() => 'waiting'),
    confirm$.mapTo(() => 'waiting'),
  ) as Stream<Reducer<ConfirmState>>;
}

function view(state$: Stream<ConfirmState>) {
  return state$.map(state => {
    return span('.child', [
      state === 'areyousure' ? span('.confirmapp',[
        button('.cancel', 'Cancel'),
        button('.confirm','Confirm')
      ]) : span('.confirmapp',[
        button('.maybe',{attrs: {disabled: state === 'disabled'}}, 'Submit')
      ])
    ]);
  });
}

export function NakedConfirmButton (sources: NakedConfirmButtonSources) {

  const actions = intent(sources);

  const vtree$ = view(sources.state.stream);

  return {
    DOM: vtree$,
    state: reducer(actions),
    submit$: actions.confirm$
  };
};

type ConfirmButtonSources = NakedConfirmButtonSources & { state: StateSource<boolean>, confirmState: StateSource<ConfirmState> }

const ConfirmButton = withState(function(sources: ConfirmButtonSources){
  const nakedSinks = NakedConfirmButton({
    ...sources,
    state: sources.confirmState
  });

  const disabledReducer$ = sources.state.stream.map(disabled => (s) => disabled ? 'disabled' : 'waiting');

  return {
    ...nakedSinks,
    confirmState: xstream.merge(
      nakedSinks.state,
      disabledReducer$
    )
  };
}, 'confirmState');

export default ConfirmButton;
