import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faSun, faCloudRain, faTemperatureHigh, faWind } from '@fortawesome/free-solid-svg-icons';

const Overview = ({ yearlyData }) => {
  if (!yearlyData || yearlyData.length === 0) {
    return <p>No yearly overview data available.</p>;
  }

  return (
    <div className="overview">
      <h2>Yearly Overview</h2>
      <ul>
        {yearlyData.map((monthData, index) => (
          <li key={index}>
            <p>Month: {new Date(0, monthData.month).toLocaleString('default', { month: 'long' })}</p>
            <p>
              <FontAwesomeIcon icon={faDroplet} /> Average Humidity: {monthData.humidity}%
            </p>
            <p>
              <FontAwesomeIcon icon={faSun} /> Average UV Index: {monthData.uvIndex}
            </p>
            <p>
              <FontAwesomeIcon icon={faCloudRain} /> Average Rainfall: {monthData.rainfall} mm
            </p>
            <p>
              <FontAwesomeIcon icon={faTemperatureHigh} /> Average Temperature: {monthData.temperature} °C
            </p>
            <p>
              <FontAwesomeIcon icon={faWind} /> Average Wind Speed: {monthData.windSpeed} m/s
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overview;
