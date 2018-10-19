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

type FormState = {
  fieldContent: string
}

export type FormSources = { DOM: MainDOMSource, name$: Stream<string> };
export type FormSinks = { DOM: Stream<VNode>, name$: Stream<string> };

type FormSourcesInner = FormSources & { formState: StateSource<FormState> };
type FormSinksInner = FormSinks & { formState: Stream<Reducer<FormState>> }


function Form (sources: FormSourcesInner): FormSinksInner {

  const assignableInputSources = {
    DOM: sources.DOM,
    assign$: sources.formState.stream.map(s => s.fieldContent)
  };
  const assignableInputSinks = AssignableInput(assignableInputSources);

  const confirmButtonSources = {
    DOM: sources.DOM,
    disabled$:  sources.formState.stream.map(s => !s.fieldContent)
  };
  const confirmButtonSinks = ConfirmButton(confirmButtonSources)

  const submittedName$ = intent(assignableInputSinks.value$, confirmButtonSinks.submit$);

  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);

  const initialReducer$: Stream<Reducer<FormState>> = xstream.of(() => ({fieldContent: '' }));
  const typeReducer$: Stream<Reducer<FormState>> = assignableInputSinks.value$.map( v => () => ({ fieldContent: v }) );
  const resetReducer$: Stream<Reducer<FormState>> = sources.name$.map( n => () => ({fieldContent: '' }));

  return {
    DOM: vtree$,
    name$: submittedName$,
    formState: xstream.merge(
      initialReducer$,
      typeReducer$,
      resetReducer$
    )
  };
};

export default withState(Form, 'formState');
