import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Weather from "./Weather";
import CoderInfo from "./CoderInfo";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className={`container`}>
        <div className="weather-app-wrapper">
          <Weather defaultCity="Brussels" />
          <CoderInfo />
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
