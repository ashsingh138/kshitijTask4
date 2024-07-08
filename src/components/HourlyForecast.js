import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloud, faWind, faDroplet, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <p>No hourly forecast data available.</p>;
  }

  return (
    <div>
      <h2>Hourly Forecast</h2>
      <ul>
        {hourlyData.slice(0, 12).map((hour, index) => (
          <li key={index}>
            <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
            <p>
              <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {hour.main.temp}°C
            </p>
            <p>
              <FontAwesomeIcon icon={faCloud} /> Weather: {hour.weather[0].description}
            </p>
            <p>
              <FontAwesomeIcon icon={faWind} /> Wind Speed: {hour.wind.speed} m/s
            </p>
            <p>
              <FontAwesomeIcon icon={faDroplet} /> Humidity: {hour.main.humidity}%
            </p>
            <p>
              <FontAwesomeIcon icon={faCloudRain} /> Rainfall: {hour.rain ? hour.rain['3h'] : 0} mm
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
