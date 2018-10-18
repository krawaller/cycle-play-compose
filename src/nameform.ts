import {div, label, MainDOMSource} from '@cycle/dom';
import isolate from '@cycle/isolate'
import Confirm from './confirm'
import Input from './input'
import xstream, {Stream} from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine'

function intent(value$, confirm$){
  return confirm$
    .startWith('') // to get initial render
    .compose(sampleCombine(value$.startWith('')))
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

export default isolate((sources: { DOM: MainDOMSource })=>{

  const inputSources = {
    DOM: sources.DOM,
    assign$: xstream.create()
  };
  const inputSinks = Input(inputSources);

  const confirmSources = {
    DOM: sources.DOM,
    disabled$: inputSinks.value$.map(v => !v).startWith(true)
  };
  const confirmSinks = Confirm(confirmSources)

  const submittedName$ = intent(inputSinks.value$, confirmSinks.submit$);

  inputSources.assign$.imitate(
    submittedName$.mapTo('')
  );

  const vtree$ = view(inputSinks.DOM, confirmSinks.DOM)

  return {
    DOM: vtree$,
    name$: submittedName$
  }
});
