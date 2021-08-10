import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
// import axios from "axios";
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
              <div className="col-3">
                <form id="search_form">
                  <input
                    type="search"
                    id="type_city"
                    className="form-control"
                    placeholder="Type city..."
                    autoComplete="off"
                    autoFocus="on"
                  />
                </form>
              </div>
              <div className="col-2 current-location">
                <form id="current_location_form">
                  <input
                    type="submit"
                    id="cur_loc_btn"
                    className="btn btn-outline"
                    value="current location"
                  />
                </form>
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
                <CurrentTemperature temperature={11} />
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
