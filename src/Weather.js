import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import FormattedTime from "./FormattedTime";
import CurrentState from "./CurrentState";
import CurrentTemperature from "./CurrentTemperature";
import MaxAndMin from "./MaxAndMin";
import CurrentExtra from "./CurrentExtra";
import Tomorrow from "./Tomorrow";

import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [precipitation, setPrecipitation] = useState(false);

  function fetchWeatherData(response) {
    console.log(response.data);
    if (response.data.rain) {
      setPrecipitation(response.data.rain["1h"]);
    }

    setWeatherData({
      ready: true,
      cityName: response.data.name,
      date: new Date(response.data.dt * 1000),
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

  function search() {
    const apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(fetchWeatherData);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function determinePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(fetchWeatherData);
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(determinePosition);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="row">
          <div className="col-3">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                className="form-control"
                placeholder="Type city..."
                autoComplete="off"
                onChange={handleCityChange}
              />
            </form>
          </div>
          <div className="col-2 current-location">
            <form onSubmit={getCurrentLocation}>
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
        <FormattedTime data={weatherData.date} />
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
    search();

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
