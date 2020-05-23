import { div, VNode } from "@cycle/dom";
import xs, { Stream } from "xstream";

export function view(formvdom$: Stream<VNode>, statsvdom$: Stream<VNode>) {
  return xs
    .combine(formvdom$, statsvdom$)
    .map(([nameformvdom, statsvdom]) =>
      div([
        div(".app", [nameformvdom, statsvdom]),
        div(".credit", ["Design by Eelke B"]),
      ])
    );
}

export default view;
