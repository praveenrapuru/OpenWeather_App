import React from 'react';
import { useNavigate } from 'react-router-dom';

const DailyWeather = ({ forecastData }) => {
  const navigate = useNavigate();

  const handleDayClick = (day) => {
    navigate(`/details/${day.date}`);
  };

  if (!forecastData) {
    return null;
  }

  return (
    <div className="mt-7 flex flex-col items-center">
      <h5 className="text-lg font-semibold mb-4">10-Days Weather Forecast</h5>

      {forecastData.forecast.forecastday.map((day, index) => (
        <div
          key={index}
          className="w-full max-w-2xl p-4 border rounded-lg grid grid-cols-5 gap-4 cursor-pointer hover:bg-gray-100"
          onClick={() => handleDayClick(day)}
        >
          <h2 className="text-sm font-medium">{day.date}</h2>
          <div className="flex flex-col items-center">
            <img src={day.day.condition.icon} alt={`${day.day.condition.text} icon`} className="w-14" />
            <p className="text-xl font-bold">
              {day.day.maxtemp_c}° <span className="text-sm font-normal">{day.day.mintemp_c}°</span>
            </p>
          </div>
          <p className="text-md font-bold col-span-2">{day.day.condition.text}</p>
          <p className="text-sm">{day.day.daily_chance_of_rain}%</p>
        </div>
      ))}
    </div>
  );
};

export default DailyWeather;
