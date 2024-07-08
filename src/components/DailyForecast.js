import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloud, faWind, faDroplet, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const DailyForecast = ({ dailyData }) => {
  if (!dailyData || dailyData.length === 0) {
    return <p>No daily forecast data available.</p>;
  }

  return (
    <div>
      <h2>Daily Forecast</h2>
      <ul>
        {dailyData.map((dayData, index) => (
          <li key={index}>
            <p>Date: {new Date(dayData.dt * 1000).toDateString()}</p>
            <p>
              <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {dayData.main.temp}°C
            </p>
            <p>
              <FontAwesomeIcon icon={faCloud} /> Weather: {dayData.weather[0].description}
            </p>
            <p>
              <FontAwesomeIcon icon={faWind} /> Wind Speed: {dayData.wind.speed} m/s
            </p>
            <p>
              <FontAwesomeIcon icon={faDroplet} /> Humidity: {dayData.main.humidity}%
            </p>
            <p>
              <FontAwesomeIcon icon={faCloudRain} /> Rainfall: {dayData.rain ? dayData.rain['3h'] : 0} mm
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
