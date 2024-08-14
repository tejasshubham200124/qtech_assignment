import React, { useState } from 'react'
import { GiWindTurbine } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";

function WeatherDetails({ apiData }) {

    const { main, weather, wind } = apiData || {}
    const [isCelsius, setIsCelsius] = useState(true)

    const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5) + 32

    const handleTempratureClick = () => {
        setIsCelsius(!isCelsius)
    }

    const temperature = isCelsius
        ? main?.temp
        : celsiusToFahrenheit(main?.temp).toFixed(1);

    // Format the temperature unit
    const temperatureUnit = isCelsius ? '°C' : '°F';
    return (
        <div>
            <div className='forecastdetails'>
                <div className=' forcast'>
                    <div className='heading'>
                        <span onClick={handleTempratureClick} style={{ cursor: 'pointer' }}>
                            {temperature} {temperatureUnit}
                        </span>
                        <div className="inner-details">
                            <span>{weather[0].description}</span>
                            <span>{`${main.temp_max} ° / ${main.temp_min} °`}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='forecastdetails'>
                <div className="content">
                    <div className='align'>
                        <span>{wind.speed} ms</span>
                        <GiWindTurbine size={24} />
                    </div>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather?.[0]?.icon}.png`}
                        className='weather-icon'

                    />
                    <div className='align'>
                        <WiHumidity size={27} />
                        <span>{main.humidity} %</span>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default WeatherDetails


