import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faWind, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';

const CurrentLocation = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="current-location">
      <h2>Current Location: {weatherData.name}</h2>
      <p>
        <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {weatherData.main.temp}°C
      </p>
      <p>
        <FontAwesomeIcon icon={faCloud} /> Weather: {weatherData.weather[0].description}
      </p>
      <p>
        <FontAwesomeIcon icon={faTint} /> Humidity: {weatherData.main.humidity}%
      </p>
      <p>
        <FontAwesomeIcon icon={faWind} /> Wind Speed: {weatherData.wind.speed} m/s
      </p>
      <p>Date & Time: {new Date(weatherData.dt * 1000).toLocaleString()}</p>
    </div>
  );
};

export default CurrentLocation;
