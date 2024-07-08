import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CurrentLocation from './components/CurrentLocation';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Overview from './components/OverviewHeader';
import axios from 'axios';
import './App.css';

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = '351c5b9c42972a839213a30e23112713'; 

  const fetchWeatherData = useCallback(async (lat, lon) => {
    try {
      
      const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
      setCurrentWeatherData(currentWeatherResponse.data);

      
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric'
        }
      });

      const forecastHourlyData = forecastResponse.data.list;
      setHourlyData(forecastHourlyData);

      
      const groupedDailyData = forecastHourlyData.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!acc[date]) {
          acc[date] = {
            dt: item.dt,
            main: item.main,
            weather: item.weather,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            wind: item.wind,
            rain: item.rain,
          };
        } else {
          acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
          acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
        }
        return acc;
      }, {});

      setDailyData(Object.values(groupedDailyData));

      
      const groupedYearlyData = forecastHourlyData.reduce((acc, item) => {
        const month = new Date(item.dt * 1000).getMonth();
        if (!acc[month]) {
          acc[month] = {
            month: month,
            humidity: item.main.humidity,
            uvIndex: item.uvi || 0,
            rainfall: item.rain ? item.rain['3h'] : 0,
            temperature: item.main.temp,
            windSpeed: item.wind.speed,
            count: 1,
          };
        } else {
          acc[month].humidity += item.main.humidity;
          acc[month].uvIndex += item.uvi || 0;
          acc[month].rainfall += item.rain ? item.rain['3h'] : 0;
          acc[month].temperature += item.main.temp;
          acc[month].windSpeed += item.wind.speed;
          acc[month].count += 1;
        }
        return acc;
      }, []);

      const averagedYearlyData = groupedYearlyData.map(monthData => ({
        month: monthData.month,
        humidity: monthData.count ? (monthData.humidity / monthData.count).toFixed(2) : 0,
        uvIndex: monthData.count ? (monthData.uvIndex / monthData.count).toFixed(2) : 0,
        rainfall: monthData.count ? (monthData.rainfall / monthData.count).toFixed(2) : 0,
        temperature: monthData.count ? (monthData.temperature / monthData.count).toFixed(2) : 0,
        windSpeed: monthData.count ? (monthData.windSpeed / monthData.count).toFixed(2) : 0,
      }));

      setYearlyData(averagedYearlyData);

      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      setError('Failed to fetch weather data. Please try again.');
    }
  }, [API_KEY]);

  const handleSearch = useCallback(async (location) => {
    try {
      const geoResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: location,
          appid: API_KEY
        }
      });
      const { lat, lon } = geoResponse.data.coord;
      fetchWeatherData(lat, lon);
    } catch (error) {
      console.error('Error fetching geolocation data:', error.response ? error.response.data : error.message);
      setError('Failed to fetch geolocation data. Please try again.');
    }
  }, [API_KEY, fetchWeatherData]);

  useEffect(() => {
    
    handleSearch('New York');
  }, [handleSearch]);

  const handleSave = (location) => {
    if (!location) {
      setError('Please enter a valid location.');
      return;
    }
    const newLocation = { location };
    setSavedLocations([...savedLocations, newLocation]);
    setError('');
  };

  const handleDelete = (index) => {
    const updatedLocations = savedLocations.filter((_, i) => i !== index);
    setSavedLocations(updatedLocations);
  };

  return (
    <div>
      <Header onSearch={handleSearch} onSave={handleSave} />
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <CurrentLocation weatherData={currentWeatherData} />
      <HourlyForecast hourlyData={hourlyData} />
      <DailyForecast dailyData={dailyData} />
      <Overview yearlyData={yearlyData} />
      <div className="saved-locations">
        {savedLocations.map((loc, index) => (
          <div key={index} className="saved-location">
            <p>{loc.location}</p>
            <button onClick={() => handleSearch(loc.location)}>Show Weather</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
