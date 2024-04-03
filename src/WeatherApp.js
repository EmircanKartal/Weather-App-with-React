import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Your CSS file for styling
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import snowIcon from './assets/snow.png';
import rainIcon from './assets/rain.png';
import mistIcon from './assets/mist.png';
import icons from './assets/mist.png';
import defaultIcon from './assets/clear.png';
import night from './assets/night.png';
// First, install Font Awesome for React: npm install @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faCloudRain, faWind, faTint, faSun } from '@fortawesome/free-solid-svg-icons';

// SearchInput component handles the city input and search button
const iconMap = {
  '01d': clearIcon, // example icon code for clear sky day
  '02d': cloudIcon, // example icon code for few clouds day
  // Add all the mappings for different weather conditions according to the API documentation
  // ...
};
// SearchInput component handles the city input and search button
const SearchInput = ({ onSearch , inputFocused }) => {
  const [input, setInput] = useState('');
  const [isMoved, setIsMoved] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // Define suggestions state here

  useEffect(() => {
    if (input.length > 2) {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
        params: { namePrefix: input },
        headers: {
          'X-RapidAPI-Key': '096b748cfcmshadccfebd9b5ca9ep1c705bjsna47879634333', // Replace with your RapidAPI Key
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };

      axios.request(options).then((response) => {
        console.log(response.data); // Log the response data to debug
        setSuggestions(response.data.data); // Adjust based on API response
      }).catch((error) => {
        console.error('Error fetching autocomplete data:', error);
      });
      
    }
  }, [input]);

  const handleSearch = () => {
    onSearch(input);
    setInput(''); // Clear input after search if needed
    setSuggestions([]); // Clear suggestions
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsMoved(true); // Set to true and never set it back to false
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Hide suggestions after a delay to allow click event to fire
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name); // Adjust depending on suggestion object structure
    setSuggestions([]);
    // You may want to directly search when a suggestion is clicked
    // onSearch(suggestion.name);
  };
  return (
    <div className={`search-container ${isMoved ? 'moved' : ''}`}>
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="search-input"
        type="text"
        placeholder="Search location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion.name} {/* Display suggestion label */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CurrentWeather = ({ weatherData }) => {
  return (
    <div className="current-weather">
      <div className="location">{weatherData.location}, {weatherData.country}</div>
      <div className="date">{weatherData.date}</div>
      <div className="weather-icon">
        <img src={weatherData.icon} alt={weatherData.description} />
      </div>
      <div className="temperature">{weatherData.temp}°C</div>
      <div className="min-max-temp">{weatherData.tempMin}° / {weatherData.tempMax}°</div>
      <div className="description">{weatherData.description}</div>
    </div>
  );
};

// Define WeatherStats here if not imported from elsewhere
const WeatherStats = ({ stats }) => {
  return (
    <div className="weather-stats">
      {stats.map((stat, index) => (
        <WeatherStat key={index} {...stat} />
      ))}
    </div>
  );
};

const WeatherStat = ({ statName, statValue, unit }) => {
  // This component must be defined as it is used by WeatherStats
  return (
    <div className="weather-stat">
      <div className="stat-name">{statName}</div>
      <div className="stat-value">{`${statValue}${unit}`}</div>
    </div>
  );
};

const ForecastDay = ({ day, icon, tempMax, tempMin }) => {
  return (
    <div className="weather-card">
      <div className="weather-day">
        <div className="day-name">{day}</div>
        <img src={icon} alt={`${day} weather`} />
        <div className="weather-temperature">{tempMax}°C</div>
        <div className="weather-temperature-min">{tempMin}°C</div>
      </div>
    </div>
  );
};

  
const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast-container">
      {forecastData.map((dayForecast, index) => (
        <ForecastDay
          key={index}
          day={dayForecast.day}
          icon={iconMap[dayForecast.icon] || defaultIcon}
          tempMax={dayForecast.tempMax}
          tempMin={dayForecast.tempMin}
        />
      ))}
    </div>
  );
};
// This component will render the current weather details
const WeatherDetailsCard = ({ stats }) => {
  if (!stats) return null; // Don't render if stats are not provided
  return (
    <div className="weather-details-card">
      {stats.feels_like && <WeatherStat name="Thermal sensation" value={stats.feels_like} />}
      {stats.rain_chance && <WeatherStat name="Probability of rain" value={`${stats.rain_chance}%`} />}
      {stats.wind_speed && <WeatherStat name="Wind speed" value={`${stats.wind_speed} km/h`} />}
      {stats.humidity && <WeatherStat name="Air humidity" value={`${stats.humidity}%`} />}
      {stats.uv_index && <WeatherStat name="UV Index" value={stats.uv_index} />}
    </div>
  );
};

// This component will render the weather showcase, e.g., icon and temperature
const WeatherShowcaseCard = ({ weatherData }) => {
  return (
    <div className="weather-showcase-card">
      <div className="weather-stat">
        <span>
          <FontAwesomeIcon icon={faThermometerHalf} className="fa-icon icon-space" />
          Thermal Sensation
        </span>
        <span>{weatherData.feels_like}°C</span>
      </div>
      <div className="weather-stat">
        <span>
          <FontAwesomeIcon icon={faCloudRain} className="fa-icon icon-space" />
          Probability of Rain
        </span>
        <span>{weatherData.rain_chance}%</span>
      </div>
      <div className="weather-stat">
        <span>
          <FontAwesomeIcon icon={faWind} className="fa-icon icon-space" />
          Wind Speed
        </span>
        <span>{weatherData.windSpeed} km/h</span>
      </div>
      <div className="weather-stat">
        <span>
          <FontAwesomeIcon icon={faTint} className="fa-icon icon-space" />
          Air Humidity
        </span>
        <span>{weatherData.humidity}%</span>
      </div>
      <div className="weather-stat">
        <span>
          <FontAwesomeIcon icon={faSun} className="fa-icon icon-space" />
          UV Index
        </span>
        <span>{weatherData.uv_index}</span>
      </div>
    </div>
  );
};




  // Updated WeatherDetails component for vertical card design
const WeatherDetails = ({ weatherData }) => {
  return (
    <div className="weather-details vertical-card">
      <div className="weather-card-header">
        <div className="location">{weatherData.location}</div>
        <div className="date">{weatherData.date}</div>
      </div>
      <div className="weather-card-body">
        
        <div className="temperature">{weatherData.temp}°C</div>
        <div className="weather-stats">
          <div className="humidity">Humidity: {weatherData.humidity}%</div>
          <div className="wind">Wind: {weatherData.windSpeed} km/h</div>
          <div className="description">{weatherData.description}</div>
        </div>
      </div>
    </div>
  );
};

// Define the two new card components
const CityWeatherCard = ({ weatherData }) => {
  return (
    <div className="city-weather-card">
      <div className="city">{weatherData.location}</div>
      <div className="date">{weatherData.date}</div>
      <div className="icon">
        <img src={weatherData.icon} alt="Weather icon" />
      </div>
      <div className="temperature">{weatherData.temp}°C</div>
      <div className="description">{weatherData.description}</div>
    </div>
  );
};

// This component will render the weather forecast
const WeatherForecastCard = ({ forecastData }) => {
  return (
    <div className="weather-forecast-card">
      {forecastData.map((dayForecast, index) => (
        <div key={index} className="forecast-day">
          <div className="day-name">{dayForecast.day}</div>
          <img src={dayForecast.icon} alt="Weather icon" />
          <div className="day-temp">{dayForecast.tempMax}°C / {dayForecast.tempMin}°C</div>
        </div>
      ))}
    </div>
  );
};
  
// Main WeatherApp component
const WeatherApp = ({ onWeatherFetched }) => { // Correctly receive props
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(false);
  const APIKey = '7be5444ccafa0a74609954aa85e89cfe'; // Your actual API key here
  const [inputFocused, setInputFocused] = useState(false);

  // Define fetchWeather inside WeatherApp to access state and props
  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
      const uvResponse = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${APIKey}`);

      const weatherData = {
        location: response.data.name,
        country: response.data.sys.country,
        date: new Date(response.data.dt * 1000).toLocaleDateString(),
        temp: Math.round(response.data.main.temp),
        tempMin: Math.round(response.data.main.temp_min),
        tempMax: Math.round(response.data.main.temp_max),
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed.toFixed(1),
        description: response.data.weather[0].description,
        icon: iconMap[response.data.weather[0].icon] || defaultIcon,
        feels_like: Math.round(response.data.main.feels_like),
        rain_chance: response.data.rain ? Math.round((response.data.rain["1h"] || 0) * 100) : 0,
        uv_index: uvResponse.data.value,
      };
      setWeather(weatherData);
      // Now, fetch the forecast data
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`);
      // Process and set the forecast data appropriately
      const processedForecastData = forecastResponse.data.list.filter((_, index) => index % 8 === 0).map(dayData => {
        return {
          day: new Date(dayData.dt_txt).toLocaleDateString('en', { weekday: 'short' }),
          icon: iconMap[dayData.weather[0].icon] || defaultIcon,
          tempMax: Math.round(dayData.main.temp_max),
          tempMin: Math.round(dayData.main.temp_min)
        };
      });

      setForecast(processedForecastData);
      // Assuming you want to lift state up or notify a parent component when new weather data is fetched
      if (onWeatherFetched) {
        onWeatherFetched({ weather: weatherData, forecast: processedForecastData });
      }

      setError(false);
    } catch (err) {
      setError(true);
      setWeather(null);
      setForecast([]);
      console.error("Error fetching the weather data:", err.response ? err.response.data : err.message);
    }
  };


return (
  <div className="weather-app">
    <SearchInput onSearch={fetchWeather} inputFocused={inputFocused} />
    {error && <div className="error-message">Oops! Invalid location or error fetching data.</div>}
    {weather && <CurrentWeather weatherData={weather} />}
    {forecast && forecast.length > 0 && <Forecast forecastData={forecast} />}
  </div>
);
};
  export {SearchInput};
  export default WeatherApp;
  export { WeatherShowcaseCard, WeatherDetailsCard, WeatherForecastCard }; // Make sure to export these
