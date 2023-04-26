import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutePath from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <RoutePath />
      <ToastContainer />
    </>
  );
}

export default App;
