import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import snowIcon from './assets/snow.png';
import rainIcon from './assets/rain.png';
import mistIcon from './assets/mist.png';
import defaultIcon from './assets/clear.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faCloudRain, faWind, faTint, faSun } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  '01d': defaultIcon,
  '01n': clearIcon,
  '02d': cloudIcon,
  '02n': cloudIcon,
  '03d': 'https://openweathermap.org/img/wn/03d@2x.png',
  '03n': 'https://openweathermap.org/img/wn/03n@2x.png',
  '04d': 'https://openweathermap.org/img/wn/04d@2x.png',
  '04n': 'https://openweathermap.org/img/wn/04n@2x.png',
  '09d': rainIcon,
  '09n': rainIcon,
  '10d': rainIcon,
  '10n': rainIcon,
  '11d': 'https://openweathermap.org/img/wn/11d@2x.png',
  '11n': 'https://openweathermap.org/img/wn/11n@2x.png',
  '13d': snowIcon,
  '13n': snowIcon,
  '50d': mistIcon,
  '50n': mistIcon,
};

const SearchInput = ({ onSearch , inputFocused }) => {
  const [input, setInput] = useState('');
  const [isMoved, setIsMoved] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]); 

  useEffect(() => {
    if (input.length > 2) {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
        params: { namePrefix: input },
        headers: {
          'X-RapidAPI-Key': '096b748cfcmshadccfebd9b5ca9ep1c705bjsna47879634333', 
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };

      axios.request(options).then((response) => {
        console.log(response.data); 
        setSuggestions(response.data.data); 
      }).catch((error) => {
        console.error('Error fetching autocomplete data:', error);
      });
      
    }
  }, [input]);

  const handleSearch = () => {
    onSearch(input);
    setInput(''); 
    setSuggestions([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsMoved(true); 
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name); 
    setSuggestions([]);
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
              {suggestion.name} {}
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
        <img src={iconMap[weatherData.icon] || defaultIcon} alt={weatherData.description} style={{ width: '160px', height: '160px' }} />
      </div>
      <div className="temperature">{weatherData.temp}°C</div>
      <div className="min-max-temp">{weatherData.tempMin}° / {weatherData.tempMax}°</div>
      <div className="description">{weatherData.description}</div>
    </div>
  );
};

const WeatherStat = ({ statName, statValue, unit }) => {
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
        <img src={icon || defaultIcon} alt={`${day} weather`} />
        <div className="weather-temperature">{tempMax}°C</div>
        <div className="weather-temperature-min">{tempMin}°C</div>
      </div>
    </div>
  );
};

  
const Forecast = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) {
    console.log("No forecast data available"); 
    return <div className="forecast-container">Loading forecast...</div>;
  }
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
const WeatherDetailsCard = ({ stats }) => {
  if (!stats) return null;
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
  
const WeatherApp = ({ onWeatherFetched }) => { 
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(false);
  const APIKey = '7be5444ccafa0a74609954aa85e89cfe';
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, handleError);
  }, []);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  };

  const handleError = (error) => {
    console.error('Geolocation error:', error);
    setError(true);
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`);
      const uvResponse = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`);
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
        icon: response.data.weather[0].icon,
        feels_like: Math.round(response.data.main.feels_like),
        rain_chance: response.data.rain ? Math.round((response.data.rain["1h"] || 0) * 100) : 0,
        uv_index: uvResponse.data.value,
      };
      setWeather(weatherData);
      setError(false);
    } catch (err) {
      console.error("Error fetching weather data:", err.message);
      setError(true);
      setWeather(null);
      setForecast([]);
    }
  };

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
        icon: response.data.weather[0].icon,
        feels_like: Math.round(response.data.main.feels_like),
        rain_chance: response.data.rain ? Math.round((response.data.rain["1h"] || 0) * 100) : 0,
        uv_index: uvResponse.data.value,
      };
      setWeather(weatherData);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`);
      console.log("Forecast API Response:", forecastResponse.data);
      const processedForecastData = forecastResponse.data.list.filter((_, index) => index % 8 === 0).map(dayData => {
      return {
        day: new Date(dayData.dt_txt).toLocaleDateString('en', { weekday: 'short' }),
        icon: dayData.weather[0].icon,
        tempMax: Math.round(dayData.main.temp_max),
        tempMin: Math.round(dayData.main.temp_min),
      };
    });

      setForecast(processedForecastData);
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
  export { WeatherShowcaseCard, WeatherDetailsCard, WeatherForecastCard }; 
