import React, { useState } from 'react';
//import WeatherApp from './WeatherApp'; // Adjust the path as necessary
import './App.css'; // Make sure your CSS styles are correctly imported
import WeatherApp from './WeatherApp';
import { WeatherShowcaseCard, WeatherDetailsCard, WeatherForecastCard } from './WeatherApp';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const handleWeatherFetched = (data) => {
    setWeatherData(data.weather);
    setForecastData(data.forecast);
  };

  return (
    <div className="App">
      <div className="weather-app-container">
        <WeatherApp onWeatherFetched={handleWeatherFetched} />
        {weatherData && <WeatherShowcaseCard weatherData={weatherData} />}
        
        {/* Render the WeatherForecastCard with forecastData */}

        {weatherData && <WeatherDetailsCard stats={weatherData.stats} />}
      </div>
    </div>
  );
}

export default App;