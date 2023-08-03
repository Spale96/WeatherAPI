import { useState } from 'react';
import { WeatherCardProps, getWeatherIcon } from './WeatherUtils';
import WeatherCard from './WeatherCard';
import '../App.css';

import axios from 'axios';


export default function Weather() {
  const [city, setCity] = useState<string | undefined>('');
  const [weatherData, setWeatherData] = useState<WeatherCardProps[]>([])
  const [searchedCity, setSearchedCity] = useState<string>('');
  const [error, setError] = useState<string>('');


  const handleSearch = async () => {
    try {
      if (city) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.REACT_APP_API_KEY}`
        );
        setSearchedCity(city);
        setError('')
        setWeatherData(response.data.list)
      }
    } catch (error) {
      setError('Searched City is not valid!');
    }
  };


  const getNextFourDays = () => {
    const nextFourDays = [];
    const today = new Date();

    for (let i = 1; i <= 4; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      nextFourDays.push(nextDay);
    }

    return nextFourDays;
  };


  return (
    <header className="h-full flex flex-col items-center p-10">

      {error && <p className='text-red-500'>{error}</p>}

      <div className="my-0 flex flex-row">
        <input
          autoComplete="true"
          required
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder='Enter a City Name...'
          type="text"
        />

        <button
          onClick={handleSearch}
          className=' bg-red-500 p-1 text-sm'>
          Search
        </button>

      </div>

      <div className="today_weather_container flex flex-row mt-16 lg:mt-10 justify-evenly w-[350px] lg:w-[600px] py-8 lg:py-20 relative">

        {weatherData.slice(0, 1).map((data, index) => {
          return (
            <WeatherCard key={index} data={data} searchedCity={searchedCity ?? ''} />
          )
        })}



        <div className='flex flex-row gap-2 lg:gap-8 absolute bottom-[-5rem] lg:bottom-[-4rem]'>
          {weatherData.slice(0, 4).map((data, index) => {
            const celsiusTemp = (data.main.temp - 273.15).toFixed(0);

            const dayOfWeek = getNextFourDays()[index].toLocaleDateString('en-GB', {
              weekday: 'long',
            });

            return (
              <div
                key={index}
                className='day_container py-2 lg:py-4 px-6 lg:px-8 bg-yellow-400 z-10 flex flex-col items-center w-[85px] lg:w-28 lg:max-w-[200px]'>
                {getWeatherIcon(data.weather[0].main)}

                <p>{dayOfWeek}</p>

                <p key={data.dt_txt}>{celsiusTemp}°C</p>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

