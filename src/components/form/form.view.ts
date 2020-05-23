import { div, VNode } from "@cycle/dom";
import xs, { Stream } from "xstream";

export function view(inputvtree$: Stream<VNode>, confirmvtree$: Stream<VNode>) {
  return xs
    .combine(inputvtree$, confirmvtree$)
    .map(([inputvtree, confirmvtree]) => {
      return div(".form", [inputvtree, confirmvtree]);
    });
}

export default view;
