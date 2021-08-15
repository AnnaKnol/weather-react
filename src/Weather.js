import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import FormattedTime from "./FormattedTime";
import CurrentState from "./CurrentState";
import MaxAndMin from "./MaxAndMin";
import CurrentExtra from "./CurrentExtra";
import Tomorrow from "./Tomorrow";

import "./Weather.css";

export default function Weather(props) {
  const apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";

  const [city, setCity] = useState(props.defaultCity);
  const [unit, setUnit] = useState("metric");
  const [APIUrl, setAPIUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
  );
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [precipitation, setPrecipitation] = useState("");
  const [wind, setWind] = useState("");
  const [celsiusState, setCelsiusState] = useState("active");
  const [fahrenheitState, setFahrenheitState] = useState("");

  useEffect(
    function () {
      function fetchWeatherData(response) {
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
        });

        if (response.data.rain) {
          setPrecipitation(
            `Precipitation: ${Math.round(response.data.rain["1h"])} mm`
          );
        }
        if (response.config.url.slice(-8) === "imperial") {
          setWind(`${Math.round(response.data.wind.speed)} mph`);
        } else {
          setWind(`${Math.round(response.data.wind.speed * 3.6)} km/h`);
        }

        setCity(response.data.name);
      }

      return axios.get(APIUrl).then(fetchWeatherData);
    },
    [APIUrl]
  );

  function handleSubmit(event) {
    event.preventDefault();
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
    );
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function determinePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    );
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(determinePosition);
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("metric");
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
    );

    setCelsiusState("active");
    setFahrenheitState("");
  }
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("imperial");
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
    );

    setCelsiusState("");
    setFahrenheitState("active");
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="row">
          <div className="col-3">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                id="searc_form"
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
            <span className="current-temperature">
              {weatherData.temperature}
            </span>
            <span className="temp-unit">
              <a href="/" className={celsiusState} onClick={showCelsius}>
                °C
              </a>{" "}
              |{" "}
              <a href="/" className={fahrenheitState} onClick={showFahrenheit}>
                °F
              </a>
            </span>
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
              wind={wind}
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
