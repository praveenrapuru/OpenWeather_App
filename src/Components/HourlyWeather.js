import React from 'react';

const HourlyWeather = ({ hourlyData }) => {
  if (!hourlyData) {
    return null;
  }

  return (
    <div className="mt-7 flex flex-col items-center">
      <div className="p-4 max-w-2xl border rounded shadow-md">
        <h6 className="text-md font-medium mb-2 text-start">Hourly Forecast</h6>
        <hr />
        <div className="overflow-x-scroll">
          <div className="flex space-x-4">
            {hourlyData.map((hour, index) => (
              <div key={index} className="min-w-[84px] text-center">
                <p className="text-sm">{hour.time}</p>
                <img src={hour.condition.icon} alt={`${hour.condition.text} icon`} className="w-10 mx-auto" />
                <p className="text-lg font-semibold">{hour.temp_c}°C</p>
                {hour.chance_of_rain !== undefined && (
                  <p className="text-sm">{hour.chance_of_rain}%</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
