import { WeatherCardProps, getWeatherIcon } from "./WeatherUtils";

type WeatherCardPropsExtended = {
    data: WeatherCardProps;
    searchedCity: string;
};

const WeatherCard = ({ data, searchedCity }: WeatherCardPropsExtended) => {
    const currentCelsiusTemp = (data.main.temp - 273.15).toFixed(0);
    const currentDate = new Date(data.dt_txt);
    const currentDay = currentDate.toLocaleDateString("en-GB", { weekday: "long" });

    return (
        <div className="flex flex-row gap-24">
            <div className="p-6 icon-wrapper">
                {getWeatherIcon(data.weather[0].main)}
            </div>
            <div>
                <h1 className="font-bold text-3xl">
                    {searchedCity}
                </h1>
                <p>
                    {currentDay === new Date().toLocaleDateString("en-GB", { weekday: "long" }) ? "Today" : currentDay}
                </p>
                <p key={data.dt_txt}>
                    {currentCelsiusTemp}°C
                </p>
                <p>
                    {data.weather[0].description}
                </p>
            </div>
        </div>
    );
};

export default WeatherCard;
