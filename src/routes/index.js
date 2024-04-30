import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../components/header";
import Home from "../components/home";
import MainPage from "../components/maincontent";
import Register from "../components/home/register";
import EncryptRecordsTenTimes from "../components/Encrypt/encrptRecords";
import DecryptStudentData from "../components/Decrypt";

// PrivateRoute component for protecting routes
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? <Component {...props} /> : <Redirect to="/home" />
    }
  />
);

const RoutePath = () => {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effect to check isLoggedIn status in local storage on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  return (
    <>
      {/* Header is displayed only when logged in */}
      {isLoggedIn && <Header />}
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Redirect to="/encrypt-records" />
          ) : (
            <Redirect to="/home" />
          )}
        </Route>
        <Route exact path="/home">
          {/* Pass handleLogin to Home component */}
          <Home />
        </Route>
        {/* Public routes */}
        <Route exact path="/register">
          <Register />
        </Route>
        {/* Private routes */}
        <PrivateRoute
          exact
          path="/verify"
          component={MainPage}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact
          path="/encrypt-records"
          component={EncryptRecordsTenTimes}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact
          path="/decrypt-records"
          component={DecryptStudentData}
          isLoggedIn={isLoggedIn}
        />
        <Route exact path="/logout">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </>
  );
};

export default RoutePath;
