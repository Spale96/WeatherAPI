import { BsFillSunFill, BsFillCloudSnowFill } from 'react-icons/bs';
import { RiWindyLine } from 'react-icons/ri';
import { WiDayCloudy } from 'react-icons/wi';
import { IoIosRainy } from 'react-icons/io';


export type WeatherCardProps = {
    dt_txt: string
    main: {
        temp: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
};


export const getWeatherIcon = (weatherDescription: string) => {
    switch (weatherDescription) {
        case 'Clear':
            return <BsFillSunFill fontSize={30} color='yellow' />;
        case 'Clouds':
            return <WiDayCloudy fontSize={30} color='gray' />;
        case 'Rain':
            return <IoIosRainy fontSize={30} color='mediumcyan' />;
        case 'Snow':
            return <BsFillCloudSnowFill fontSize={30} />;
        case 'Windy':
            return <RiWindyLine fontSize={30} />;
        default:
            return null;
    };
};
