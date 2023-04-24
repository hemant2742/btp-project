import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../components/header";
import Home from "../components/home";
import GenerateQR from "../components/generate-qr";
import VerifyDocument from "../components/verify-document";

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
          <Route exact path="/generate-qr">
            <GenerateQR />
          </Route>
          <Route exact path="/verify">
            <VerifyDocument />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default RoutePath;
