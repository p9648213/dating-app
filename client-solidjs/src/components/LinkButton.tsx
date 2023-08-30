import { A } from "@solidjs/router";
import { JSX } from "solid-js";

type LinkButtonProps = {
  children: JSX.Element;
  href: string;
  active?: string;
};

function LinkButton(props: LinkButtonProps) {
  return (
    <A
      class="inline-block rounded px-8 py-3 text-md font-medium transition hover:scale-110  focus:outline-none  hover:text-rose-700"
      href={props.href}
      activeClass={props.active}
    >
      {props.children}
    </A>
  );
}

export default LinkButton;
