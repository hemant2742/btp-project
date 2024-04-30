import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutePath from "./routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {

  const disableRightClick = (e) => {
    e.preventDefault();
  }
  return (
    <div onContextMenu={disableRightClick}>
      <BrowserRouter>
        <RoutePath />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
