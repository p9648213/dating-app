import { JSX } from "solid-js";

type ButtonProps = {
  children: JSX.Element;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  disable?: boolean;
  theme: "dark" | "light";
};

function Button(props: ButtonProps) {
  const darkStyle =
    "block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-900 focus:outline-none focus:ring sm:w-auto transition-all duration-300";

  const lightStyle =
    "block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-white hover:bg-rose-700 focus:outline-none focus:ring sm:w-auto transition-all duration-300";

  return (
    <button
      disabled={props.disable}
      onClick={props.onClick}
      class={props.theme === "dark" ? darkStyle : lightStyle}
    >
      {props.children}
    </button>
  );
}

export default Button;
