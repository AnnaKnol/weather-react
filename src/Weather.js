import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import CurrentState from "./CurrentState";
import CurrentTemperature from "./CurrentTemperature";
import MaxAndMin from "./MaxAndMin";
import CurrentExtra from "./CurrentExtra";
import Tomorrow from "./Tomorrow";

import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [precipitation, setPrecipitation] = useState(false);

  function fetchWeatherData(response) {
    if (response.data.rain) {
      setPrecipitation(response.data.rain["1h"]);
    }

    setWeatherData({
      ready: true,
      cityName: response.data.name,
      updateTime: "Friday 12:50",
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      temperature: Math.round(response.data.main.temp),
      minTemperature: Math.round(response.data.main.temp_min),
      maxTemperature: Math.round(response.data.main.temp_max),
      humidity: Math.round(response.data.main.humidity),
      feelingTemperature: Math.round(response.data.main.feels_like),
      wind: Math.round(response.data.wind.speed * 3.6),
    });
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
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
            <h1>{weatherData.cityName}</h1>
          </div>
        </div>
        <small className="updated">Last updated:</small>
        <h5>{weatherData.updateTime}</h5>
        <br />
        <div className="row">
          <div className="col current-state">
            <CurrentState
              icon={weatherData.icon}
              description={weatherData.description}
            />
          </div>
          <div className="col-4 current">
            <CurrentTemperature temperature={weatherData.temperature} />
          </div>
          <div className="col-1 max-and-min">
            <MaxAndMin
              minTemperature={weatherData.minTemperature}
              maxTemperature={weatherData.maxTemperature}
            />
          </div>
          <div className="col current-extra">
            <CurrentExtra
              humidity={weatherData.humidity}
              feelingTemperature={weatherData.feelingTemperature}
              wind={weatherData.wind}
              precipitation={precipitation}
            />
          </div>
          <div className="col-2 tomorrow">
            <Tomorrow />
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(fetchWeatherData);

    return (
      <div className="Weather">
        <div className="row">
          <div className="col-3">
            <form id="search_form">
              <input
                type="search"
                id="type_city"
                className="form-control"
                placeholder="Type city..."
                autoComplete="off"
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
        <div className="loader">
          <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        </div>
      </div>
    );
  }
}
