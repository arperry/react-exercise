import { CSSObject, Header } from "@mantine/core";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import store from "./store";
import ErrorPage from "./components/404";
import Dashboard from "./components/dashboard";
import TodoDetails from "./components/todoDetails";

const styles: CSSObject = {
  fontSize: 50,
  backgroundColor: "#c1e1ec",
  color: "#FFF",
  textAlign: "center",
};

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header height={{ base: 50, md: 70 }} sx={styles}>
          React Exercise
        </Header>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/todo/:id?" component={TodoDetails} />
          <Route path="/404" component={ErrorPage} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
