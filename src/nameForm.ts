import {div, label, MainDOMSource} from '@cycle/dom';
import isolate from '@cycle/isolate'
import ConfirmButton from './confirmButton'
import AssignableInput from './assignableInput'
import xstream, {Stream} from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine'

function intent(newFieldValue$: Stream<string>, confirmButtonClick$: Stream<any>): Stream<string> {
  return confirmButtonClick$
    .startWith('') // to get initial render
    .compose(sampleCombine(newFieldValue$.startWith('')))
    .map(([_, v]) => v);
}

function view(inputvtree$, confirmvtree$){
  console.log('nameform view');
  return xstream.combine(inputvtree$, confirmvtree$).map(([inputvtree,confirmvtree]) => {
    return div('.child',[
      label('Name: '),
      inputvtree,
      confirmvtree
    ]);
  });
}

export default (sources: { DOM: MainDOMSource })=>{

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

  const submittedName$ = intent(assignableInputSinks.value$, confirmButtonSinks.submit$);

  assignableInputSources.assign$.imitate(
    submittedName$.mapTo('')
  );

  const vtree$ = view(assignableInputSinks.DOM, confirmButtonSinks.DOM)

  //const reducer$ = assignableInputSinks.value$.map(setName)

  return {
    DOM: vtree$,
    name$: submittedName$,
    //reducers$: reducer$.tap(fn => consol)
  }
};


type State = {
  name: string;
  submitted: string;
}

// type Reducer<T> = (state: T) => T;

// function $etName(name: string): Reducer<State> {
//   return function setName(state) {
//     return {
//       ...state,
//       name
//     };
//   }
// }