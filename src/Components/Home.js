import React, { useState, useEffect, useRef } from 'react';
import DisplayCurrentWeather from './DisplayCurrentWeather';
import DailyWeather from './DailyWeather';
import HourlyWeather from './HourlyWeather';
import currentWeatherData from './current_weather.json';
import forecastWeatherData from './forecast_weather.json';

const Home = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState(currentWeatherData);
  const [searchTerm, setSearchTerm] = useState('');
  const [hourlyData, setHourlyData] = useState(null);
  const [forecastData, setForecastData] = useState(forecastWeatherData);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ latitude, longitude });
        fetchWeatherData(latitude, longitude);
        fetchHourlyWeatherData(latitude, longitude);
        fetchDailyWeatherData(latitude, longitude);

      },
    );
  }, []);

  const Api_Key = process.env.REACT_APP_API_KEY;

  const fetchWeatherData = (latitude, longitude) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${Api_Key}&q=${latitude},${longitude}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch current weather data');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const fetchHourlyWeatherData = (latitude, longitude) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${Api_Key}&q=${latitude},${longitude}&hours=24`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.forecast && data.forecast.forecastday) {
          const forecastDay = data.forecast.forecastday[0];
          setHourlyData(forecastDay.hour);
        }
      });
  };

  const fetchDailyWeatherData = (latitude, longitude) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${Api_Key}&q=${latitude},${longitude}&days=10`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setForecastData(data); 
      });
  };

  const handleSearch = (value) => {
    if (value.length >= 3) {
      const url = `http://api.weatherapi.com/v1/search.json?key=${Api_Key}&q=${value}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setSuggestions(data);
            setShowDropdown(true);
          }
        });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    const { lat, lon } = suggestion;
    fetchWeatherData(lat, lon);
    fetchHourlyWeatherData(lat, lon);
    fetchDailyWeatherData(lat, lon); 
    setShowDropdown(false);
  };
  if (error) return <p className='text-red-600'>Api key expired</p>
  return (
    <div>
      <div className="bg-black p-3">
        {weatherData && weatherData.location && (
          <div className='grid grid-cols-6 gap-4'>
            <div className="col-start-2 col-span-3">
              <h2 className="text-lg text-white font-normal">
                <span className='text-xl'>OpenWeather</span>
                <span className='ps-2'>{weatherData.location.name}, {weatherData.location.region}</span>
                <span className='ps-2 text-sm '>{weatherData.current.temp_c}°C</span>
              </h2>
            </div>
            <div>
              <div className='absolute ps-2 pointer-events-none'>
                <svg className="w-4 h-5 inline-block align-bottom text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                ref={inputRef} 
                className="p-2 ps-8 rounded-md w-80 text-sm"
                placeholder="Address, City or Zip Code"
                type='text'
                onChange={(e) =>{ 
                  handleSearch(e.target.value);
                  setSearchTerm(e.target.value); 
                }}
                value={searchTerm}
              />
              <select className='absolute right-40 top-5 border-white text-sm font-light'>
                <option value="">Location</option>
                <option value="">News</option>
                <option value="">Videos</option>
              </select>
              {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-10 w-80 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <p>{suggestion.name}</p>
                      <p className='font-light text-xs'>{suggestion.region}</p>
                      <hr className='mt-2'/>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      <DisplayCurrentWeather weatherData={weatherData} />
      {position.latitude && position.longitude && (
        <>
          <HourlyWeather hourlyData={hourlyData} />
          <DailyWeather forecastData={forecastData} />
        </>
      )}
    </div>
  );
};

export default Home;
