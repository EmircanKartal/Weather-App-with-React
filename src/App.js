import React, { useState } from 'react';
//import WeatherApp from './WeatherApp'; // Adjust the path as necessary
import './App.css'; // Make sure your CSS styles are correctly imported
import WeatherApp from './WeatherApp';
import { WeatherShowcaseCard, WeatherDetailsCard, WeatherForecastCard } from './WeatherApp';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  // Function to update state with fetched weather and forecast
  const handleWeatherFetched = (data) => {
    setWeatherData(data.weather);
    setForecastData(data.forecast);
  };

  return (
    <div className="App">
      
      <div className="weather-app-container">
        {/* Pass the function to WeatherApp to get the data after fetch */}
        <WeatherApp onWeatherFetched={handleWeatherFetched} />

        {/* Render the individual cards only if data is available */}
        {weatherData && <WeatherShowcaseCard weatherData={weatherData} />}
        {weatherData && <WeatherDetailsCard stats={weatherData.stats} />}
        {forecastData.length > 0 && <WeatherForecastCard forecastData={forecastData} />}
      </div>
    </div>
  );
}

export default App;