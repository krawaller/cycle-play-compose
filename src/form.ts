import {div, label, MainDOMSource, VNode} from '@cycle/dom';
import isolate from '@cycle/isolate'
import ConfirmButton from './confirmButton'
import AssignableInput from './assignableInput'
import xstream, {Stream} from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine'
import {StateSource, Reducer, Lens} from '@cycle/state';

function intent(state$: Stream<FormState>, confirmButtonClick$: Stream<any>): Stream<string> {
  return confirmButtonClick$
    .compose(sampleCombine(state$.map(s => s.fieldContent))) 
    .map(([_, v]) => v);
}

function view(inputvtree$, confirmvtree$){
  return xstream.combine(inputvtree$, confirmvtree$).map(([inputvtree,confirmvtree]) => {
    return div('.child',[
      label('Name: '),
      inputvtree,
      confirmvtree
    ]);
  });
}

export type FormState = {
  fieldContent: string
  submittedName: string
}

export type FormSources = { DOM: MainDOMSource, state: StateSource<FormState> };
export type FormSinks = { DOM: Stream<VNode>, state: Stream<Reducer<FormState>>  };


function Form (sources: FormSources): FormSinks {

  const assignableInputSinks = isolate(AssignableInput, 'fieldContent')(sources) as FormSinks;

  const confirmButtonLens: Lens<FormState, boolean> = {
    get: (s: FormState) => !s.fieldContent,
    set: s => s
  };

  const confirmButtonSinks = isolate(ConfirmButton, {state: confirmButtonLens})(sources);

  const submittedName$ = intent(sources.state.stream, confirmButtonSinks.submit$);

  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);

  const defaultReducer$: Stream<Reducer<FormState>> = xstream.of((s) => s || ({ submittedName: '', fieldContent: '' }));
  const submitReducer$: Stream<Reducer<FormState>> = submittedName$.map( newName => () => ({ submittedName: newName, fieldContent: '' }));

  return {
    DOM: vtree$,
    state: xstream.merge(
      defaultReducer$,
      assignableInputSinks.state,
      submitReducer$
    )
  };
};

export default Form
