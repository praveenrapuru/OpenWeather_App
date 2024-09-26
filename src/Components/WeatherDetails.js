import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import forecastWeatherData from './forecast_weather.json';

const WeatherDetails = () => {
  const { date } = useParams();
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dayData = forecastWeatherData.forecast.forecastday.find((day) => day.date === date);
    setSelectedDay(dayData);
  }, [date]);

  if (!selectedDay) {
    return 
  }
  const goBack = () => {
    navigate(-1); 
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long',  day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-7 flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4 mb-3">
        <button onClick={goBack} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Back</button>
        <h3 className="text-lg font-bold">{formatDate(selectedDay.date)}</h3>
      </div>
      <div className="w-full max-w-2xl p-2 border rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <h5 className="col-span-2">Day</h5>
          <p className="text-end">{selectedDay.date}</p>
        </div>
        <hr />
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-2 mt-2'>
            <img src={selectedDay.day.condition.icon} alt={`${selectedDay.day.condition.text} icon`} className="w-20" />
            <h1 className='font-bold text-2xl'>{selectedDay.day.maxtemp_c}°<span className='text-slate-700 text-sm'>Hi</span></h1>
          </div>
          <div className='col-span-2 mt-3'>
            <p className="text-md ">RealFeel
            <span className="ps-1 ">{selectedDay.hour[0].feelslike_c}°</span>
            </p>
            <p className="text-md mt-2 ">RealFeel Shade 
              <span className=" ps-1 ">{selectedDay.hour[0].feelslike_f}°</span>
            </p>
          </div> 
        </div>  
        <p className='mt-3 text-xl'>{selectedDay.day.condition.text}</p>
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-2'>
            <p className='mt-3'>Max UV Index <span className='text-end ps-20'>{selectedDay.hour[0].uv} <span>Very Unhealthy</span></span></p>
            <hr className='mt-2'/>
            <p className='mt-3' >Wind <span className='ps-40'>WNW {selectedDay.hour[0].wind_kph} km/h</span></p>
            <hr className='mt-2'/>
            <p className='mt-3'>Wind Gusts<span className='ps-40'>{selectedDay.hour[0].gust_kph} km/h</span></p>
            <hr className='mt-2'/>
            <p className='mt-3'>Probability of Precipitation<span className='ps-24'>{selectedDay.hour[0].precip_in}%</span></p>
            
          </div>
          <div className='col-span-2'>
            <p className='mt-3'>Probability of Thunderstorms<span className='ps-14'>{selectedDay.hour[0].chance_of_rain}%</span></p>
            <hr className='mt-2'/>
            <p className='mt-3'>Precipitation <span className='ps-40'>{selectedDay.hour[0].precip_mm} mm</span></p>
            <hr className='mt-2'/>
            <p className='mt-3'>Cloud Cover <span className='ps-44'>{selectedDay.hour[0].cloud}%</span></p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
