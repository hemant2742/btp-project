import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../components/header";
import Home from "../components/home";
import MainPage from "../components/maincontent";

const RoutePath = () => {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/my-app">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/verify">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default RoutePath;
