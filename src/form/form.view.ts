import { div, label, VNode } from "@cycle/dom";
import xstream, { Stream } from "xstream";

export function view(inputvtree$: Stream<VNode>, confirmvtree$: Stream<VNode>) {
  return xstream
    .combine(inputvtree$, confirmvtree$)
    .map(([inputvtree, confirmvtree]) => {
      return div(".child", [label("Name: "), inputvtree, confirmvtree]);
    });
}

export default view;