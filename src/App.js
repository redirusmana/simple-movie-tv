import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Auth from "./Features/Auth";
import People from "./Features/People";
import Tv from "./Features/Tv";
import Movie from "./Features/Movie";
import Search from "./Features/Search";

import "./App.css";
import RoutePrivate from "./Tools/RoutePrivate";
import RouteGuard from "./Tools/RouteGuard";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <div className="content">
            <Switch>
              <RouteGuard path="/auth" component={Auth} />
              <RoutePrivate path="/people" component={People} />
              <RoutePrivate path="/tv-show" component={Tv} />
              <RoutePrivate path="/movie" component={Movie} />
              <RoutePrivate path="/search" component={Search} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
