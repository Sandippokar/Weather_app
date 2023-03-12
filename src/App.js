import React, { useState } from "react";
import "./App.css";
import { api_url, api_key } from "./baseurl";
import CurrentWeather from "./components/current-weather/CurrentWeather.js";
import Forecast from "./components/forecast/Forecast.tsx";
import Loader from "./components/loader/Loader";

const App = () => {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [forecast, setForecast] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoder] = useState(false);

  const fetchWeatherData = () => {
    setLoder(true);

    const fetchCurrentWeather = fetch(
      `${api_url}/weather?q=${city}&appid=${api_key}&units=metric`
    );

    const fetchForecast = fetch(
      `${api_url}/forecast?q=${city}&appid=${api_key}&units=metric`
    );

    Promise.all([fetchCurrentWeather, fetchForecast])
      .then(async (response) => {
        if (response[0].status === 200 || response[1].status === 200) {
          const weatherData = await response[0].json();
          const forcastData = await response[1].json();

          setCurrentWeather(weatherData);
          setForecast(forcastData);
          setError(false);
          setLoder(false);
          setCity("");
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
      });
  };

  return (
    <div className="App">
      <h2>Weather App</h2>
      <div className="container">
        <label id="searchcity">Search City : </label>
        <input
          type="text"
          className="searchText"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeatherData}
          className="button"
          disabled={city === ""}
        >
          Submit
        </button>
      </div>

      {!error ? (
        loader ? (
          <div id="loader">
            <Loader />
          </div>
        ) : (
          <>
            {currentWeather && <CurrentWeather data={currentWeather} />}

            {forecast && <Forecast data={forecast} />}
          </>
        )
      ) : (
        <h3 style={{ color: "red" }}>
          Data Not Found! Please Enter Other City!
        </h3>
      )}
    </div>
  );
};

export default App;
