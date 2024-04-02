import React, { useState } from 'react';

// WeatherCard component for individual city weather details
const WeatherCard = ({ cityWeather }) => {
  return (
    <div className="weather-card">
      <div className="weather-top">
        <div className="temperature">{cityWeather.temperature}°</div>
        <div className="city-name">{cityWeather.city}, {cityWeather.country}</div>
        <div className="sunset-time">Sunset Time: {cityWeather.sunsetTime}</div>
      </div>
      <div className="weather-details">
        <div className="humidity">Humidity: {cityWeather.humidity}%</div>
        <div className="wind-speed">Wind Speed: {cityWeather.windSpeed} km/h</div>
        <div className="weather-description">{cityWeather.description}</div>
      </div>
    </div>
  );
};

// Main component that holds the state and logic
const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  // Assuming you have a function to fetch weather data
  const fetchWeather = (cityName) => {
    // Your API call logic here, then set the weather info
    // setWeatherInfo(fetchedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </form>
      {weatherInfo && <WeatherCard cityWeather={weatherInfo} />}
    </div>
  );
};

export default WeatherApp;
