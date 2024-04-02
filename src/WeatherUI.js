// WeatherUI.js
import React from 'react';
import './WeatherUI.css'; // You need to create and style this CSS file

// A reusable UI component for displaying weather attributes
const WeatherAttribute = ({ label, value, unit }) => {
  return (
    <div className="weather-attribute">
      <div className="weather-attribute-label">{label}</div>
      <div className="weather-attribute-value">{value}{unit}</div>
    </div>
  );
};
// WeatherCard component combining weather details, icon, temperature, location, and time
export const WeatherCard = ({ weatherData }) => {
    return (
      <div className="weather-card">
        <div className="weather-icon">{/* Icon component or img tag */}</div>
        <div className="weather-info">
          <div className="weather-temperature">{weatherData.temperature}°</div>
          <div className="weather-location">{weatherData.city}, {weatherData.country}</div>
          <div className="weather-time">{weatherData.time}</div>
        </div>
        <div className="weather-description">{weatherData.description}</div>
      </div>
    );
  };
  
  // DetailsCard component for displaying humidity, UV index, etc.
  export const DetailsCard = () => {
    return (
      <div className="details-card">
        <div className="detail">
          <div className="detail-icon">🌡️</div>
          <div className="detail-value">30%</div>
          <div className="detail-label">Humidity</div>
        </div>
        <div className="detail">
          <div className="detail-icon">☀️</div>
          <div className="detail-value">0 of 10</div>
          <div className="detail-label">UV Index</div>
        </div>
        {/* ... more details like sunrise and sunset */}
      </div>
    );
  };
  
  // ChartCard component for displaying the horizontal chart
  export const ChartCard = () => {
    return (
      <div className="chart-card">
        {/* You will likely need to use a chart library like Chart.js or Recharts */}
        <div className="chart">Chart Placeholder</div>
      </div>
    );
  };
  
  // ForecastCard component for displaying the daily forecast
  export const ForecastCard = () => {
    return (
      <div className="forecast-card">
        <div className="day-forecast">Monday</div>
        <div className="day-temperature">13°</div>
        {/* ... other days */}
      </div>
    );
  };
// The main component that encapsulates the entire weather UI
const WeatherUI = ({ weatherData }) => {
  return (
    <div className="weather-container">
      <div className="weather-header">
        <div className="weather-city">{weatherData.city}, {weatherData.country}</div>
        <div className="weather-temperature">{weatherData.temperature}°</div>
        <div className="weather-description">{weatherData.description}</div>
      </div>
      <div className="weather-body">
        <WeatherAttribute label="Humidity" value={weatherData.humidity} unit="%" />
        <WeatherAttribute label="Wind Speed" value={weatherData.windSpeed} unit="km/h" />
        <WeatherAttribute label="Sunset" value={weatherData.sunsetTime} unit="" />
        {/* You can add more attributes here */}
      </div>
      {/* You might add additional components here, such as charts or graphs */}
    </div>
  );
};

export default WeatherUI;
