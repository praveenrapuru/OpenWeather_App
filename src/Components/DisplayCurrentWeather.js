import React from 'react';

const DisplayCurrentWeather = ({ weatherData }) => {
  const now = new Date();
  const  hours = now.getHours();
  const minutes = now.getMinutes();
  return (
    <div className=" flex mt-7 justify-center">
    <div className="p-4 max-w-2xl border rounded shadow-md">
      
        <h5 className="text-sm text-slate-500 ">CURRENT WEATHER
          <span className="ps-96 font-semibold text-slate-900 ">{hours}:{minutes}</span>
        </h5>
        <hr/>
        
        <div className="items-center space-x-3 grid grid-rows-3 grid-flow-col gap-4">
          <div class="row-span-4">
          <img src={weatherData.current.condition.icon} alt={`${weatherData.current.condition.text} icon`} className="w-10 mx-auto" />
          <p className="text-5xl font-bold">{weatherData.current.temp_c}<span className='text-slate-500 font-normal'>°</span><span className='text-xl text-slate-600'>C</span></p>
            <p className="text-md ">RealFeel 
             <span className="text-lg ps-2 font-semibold ">{weatherData.current.feelslike_c}°</span>
            </p>
          </div>
          <div class="row-span-1 mt-6">
            <p className="text-md ">RealFeel Shade 
            <span className="text-lg ps-52 font-semibold ">{weatherData.current.feelslike_c}°</span>
            </p>
            <hr className='mt-2'/>
          </div>

          <div class="row-span-1 ">
            <p className="text-md ">Wind 
              <span className="text-lg font-semibold ps-56 ">{weatherData.current.wind_dir}
                <span className='ps-1'>{weatherData.current.wind_kph} km/h</span>
              </span>
            </p>
            <hr className='mb-4'/>
          </div>

          <div class="row-span-1 ">
            <p className="text-md ">Wind Gusts
              <span className="text-lg font-semibold ps-52 ">{weatherData.current.gust_kph} km/h</span>
            </p>
            <hr className='mb-1'/>
          </div>

          <div class="row-span-1">
            <p className="text-md ">Air Quality
              <span className="text-lg font-semibold ps-56">{weatherData.current.air_quality ? weatherData.current.air_quality.pm2_5 : "N/A"}</span>  
            </p> 
            <hr className='mb-1'/>       
          </div>
          
          {/* <div className="">
            <p className="text-md ">RealFeel Shade</p> 
            < span className="text-lg font-semibold ">{weatherData.current.feelslike_c}°</span>
          </div> */}
        </div>
      
    </div>
  </div>
);
};

export default DisplayCurrentWeather