import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import FormattedTime from "./FormattedTime";
import CurrentState from "./CurrentState";
import MaxAndMin from "./MaxAndMin";
import CurrentExtra from "./CurrentExtra";
import Tomorrow from "./Tomorrow";
import WeatherForecast from "./WeatherForecast";

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
  const [celsiusState, setCelsiusState] = useState("active");
  const [fahrenheitState, setFahrenheitState] = useState("");

  useEffect(
    function () {
      function fetchWeatherData(response) {
        setWeatherData({
          ready: true,
          cityName: response.data.name,
          coordinates: response.data.coord,
          date: new Date(response.data.dt * 1000),
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
          temperature: response.data.main.temp,
          minTemperature: response.data.main.temp_min,
          maxTemperature: response.data.main.temp_max,
          humidity: Math.round(response.data.main.humidity),
          feelingTemperature: response.data.main.feels_like,
          wind: response.data.wind.speed,
        });

        if (response.data.rain) {
          setPrecipitation(
            `Precipitation: ${Math.round(response.data.rain["1h"])} mm`
          );
        } else {
          setPrecipitation("");
        }

        setCity(response.data.name);
      }

      return axios
        .get(APIUrl)
        .then(fetchWeatherData)
        .catch(function (error) {
          alert(
            "Please, try typing it correctly or use another place in the area 📍 👍"
          );
        });
    },
    [APIUrl]
  );

  function handleSubmit(event) {
    event.preventDefault();
    resetToCelsius();
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    let searchFormElement = document.querySelector("#search_form");
    searchFormElement.value = "";
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function determinePosition(position) {
    resetToCelsius();
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    setAPIUrl(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(determinePosition);
  }

  function resetToCelsius() {
    setUnit("metric");
    setCelsiusState("active");
    setFahrenheitState("");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("metric");
    setCelsiusState("active");
    setFahrenheitState("");
  }
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("imperial");
    setCelsiusState("");
    setFahrenheitState("active");
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="row">
          <div className="col-8 col-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                id="search_form"
                className="form-control"
                placeholder="Type city..."
                autoComplete="off"
                onChange={handleCityChange}
              />
            </form>
          </div>
          <div className="col-4 col-md-2 current-location">
            <form onSubmit={getCurrentLocation}>
              <input
                type="submit"
                id="cur_loc_btn"
                className="btn btn-outline"
                value="current location"
              />
            </form>
          </div>
          <div className="col-md-7">
            <h1>{weatherData.cityName}</h1>
          </div>
        </div>
        <small className="updated">Last updated:</small>
        <FormattedTime data={weatherData.date} />
        <br />
        <div className="row">
          <div className="col-7 col-md-5 col-lg current-state">
            <CurrentState
              icon={weatherData.icon}
              description={weatherData.description}
            />
          </div>
          <div className="col-7 col-md-5 col-lg-4 current">
            <span className="current-temperature">
              {unit === "metric"
                ? Math.round(weatherData.temperature)
                : Math.round(weatherData.temperature * (9 / 5) + 32)}
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
              minTemperature={
                unit === "metric"
                  ? Math.round(weatherData.minTemperature)
                  : Math.round((weatherData.minTemperature * 9) / 5 + 32)
              }
              maxTemperature={
                unit === "metric"
                  ? Math.round(weatherData.maxTemperature)
                  : Math.round((weatherData.maxTemperature * 9) / 5 + 32)
              }
            />
          </div>
          <div className="col-12 col-md-4 col-lg current-extra">
            <CurrentExtra
              humidity={weatherData.humidity}
              feelingTemperature={
                unit === "metric"
                  ? Math.round(weatherData.feelingTemperature)
                  : Math.round((weatherData.feelingTemperature * 9) / 5 + 32)
              }
              wind={
                unit === "metric"
                  ? `${Math.round(weatherData.wind * 3.6)} km/h`
                  : `${Math.round(weatherData.wind)} mph`
              }
              precipitation={precipitation}
            />
          </div>
          <hr className="d-block d-lg-none" />
          <div className="col col-lg-2 tomorrow">
            <Tomorrow coordinates={weatherData.coordinates} unit={unit} />
          </div>
        </div>
        <hr className="d-none d-lg-block" />
        <WeatherForecast coordinates={weatherData.coordinates} unit={unit} />
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
