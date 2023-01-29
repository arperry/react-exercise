import { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom/client";

import store from "./app/store";

import App from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Added Mantine UI - but did not create theme or global style sheet for simplicity.
root.render(
  <StrictMode>
    <MantineProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>
);
