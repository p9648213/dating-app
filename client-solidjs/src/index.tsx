/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/User";

const root = document.getElementById("root");

render(
  () => (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  ),
  root!
);
