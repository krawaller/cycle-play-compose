import {div, label, MainDOMSource, VNode} from '@cycle/dom';
import isolate from '@cycle/isolate'
import ConfirmButton from './confirmButton'
import AssignableInput from './assignableInput'
import xstream, {Stream} from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine'
import {withState, StateSource, Reducer} from '@cycle/state';

function intent(newFieldValue$: Stream<string>, confirmButtonClick$: Stream<any>): Stream<string> {
  return confirmButtonClick$
    .compose(sampleCombine(newFieldValue$))
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

  const assignableInputSources = {
    DOM: sources.DOM,
    assign$: sources.state.stream.map(s => s.fieldContent)
  };
  const assignableInputSinks = AssignableInput(assignableInputSources);

  const confirmButtonSources = {
    DOM: sources.DOM,
    disabled$:  sources.state.stream.map(s => !s.fieldContent)
  };
  const confirmButtonSinks = ConfirmButton(confirmButtonSources)

  const submittedName$ = intent(assignableInputSinks.value$, confirmButtonSinks.submit$);

  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);

  const defaultReducer$: Stream<Reducer<FormState>> = xstream.of((s) => s || ({ submittedName: '', fieldContent: '' }));
  const typeReducer$: Stream<Reducer<FormState>> = assignableInputSinks.value$.map( v => (s) => ({ ...s, fieldContent: v }) );
  const submitReducer$: Stream<Reducer<FormState>> = submittedName$.map( newName => () => ({ submittedName: newName, fieldContent: '' }));

  return {
    DOM: vtree$,
    state: xstream.merge(
      defaultReducer$,
      typeReducer$,
      submitReducer$
    )
  };
};

export default Form
