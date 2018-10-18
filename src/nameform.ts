import {div, label, MainDOMSource} from '@cycle/dom';
import isolate from '@cycle/isolate'
import ConfirmButton from './confirmButton'
import AssignableInput from './assignableInput'
import xstream, {Stream} from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine'

function intent(newFieldValue$: Stream<string>, confirmButtonClick$: Stream<any>, assignedNames$: Stream<string>): Stream<string> {
  const confirmedName$ = confirmButtonClick$
    .compose(sampleCombine(newFieldValue$))
    .map(([_, v]) => v);

  return xstream.merge(
    confirmedName$,
    assignedNames$
  );
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

export default (sources: { DOM: MainDOMSource, assign$: Stream<string> })=>{

  const assignableInputSources = {
    DOM: sources.DOM,
    assign$: xstream.create() as Stream<string>
  };
  const assignableInputSinks = AssignableInput(assignableInputSources);

  const confirmButtonSources = {
    DOM: sources.DOM,
    disabled$: assignableInputSinks.value$.map(v => !v).startWith(true)
  };
  const confirmButtonSinks = ConfirmButton(confirmButtonSources)

  const submittedName$ = intent(assignableInputSinks.value$, confirmButtonSinks.submit$, sources.assign$);

  assignableInputSources.assign$.imitate(
    xstream.merge(submittedName$, sources.assign$).mapTo('')
  );

  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM);

  return {
    DOM: vtree$,
    name$: xstream.merge(sources.assign$, submittedName$)
  }
};
