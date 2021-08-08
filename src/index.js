import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import CurrentState from "./CurrentState";
import CurrentTemperature from "./CurrentTemperature";
import MaxAndMin from "./MaxAndMin";
import CurrentExtra from "./CurrentExtra";
import Tomorrow from "./Tomorrow";
import CoderInfo from "./CoderInfo";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="weather-app-wrapper">
          <div className="weather-app">
            <div className="row">
              <div className="col-5">
                <Search />
              </div>
              <div className="col-7">
                <h1>Brussels</h1>
              </div>
            </div>
            <small className="updated">Last updated:</small>
            <h5>Friday 12:50</h5>
            <br />
            <div className="row">
              <div className="col current-state">
                <CurrentState />
              </div>
              <div className="col-4 current">
                <CurrentTemperature />
              </div>
              <div className="col-1 max-and-min">
                <MaxAndMin />
              </div>
              <div className="col current-extra">
                <CurrentExtra humidity={80} feelingTemperature={13} wind={3} />
              </div>
              <div className="col-2 tomorrow">
                <Tomorrow />
              </div>
            </div>
          </div>
          <CoderInfo />
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
