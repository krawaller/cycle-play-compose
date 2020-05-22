import { Stream } from "xstream";
import sampleCombine from "xstream/extra/sampleCombine";

import { FormAction, FormSources } from "./form.types";

export function intent(
  sources: FormSources,
  confirmButtonClick$: Stream<undefined>
): Stream<FormAction> {
  const field$ = sources.state.stream.map((s) => s.fieldContent);
  return confirmButtonClick$.compose(sampleCombine(field$)).map(([_, v]) => v);
}

export default intent;
