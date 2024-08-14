import React, { useCallback, useEffect, useState } from 'react'
import weatherapp from './assets/weather-bg2.jpg'
import { MdOutlineLightMode } from "react-icons/md";
import debounce from 'lodash/debounce'
import WeatherDetails from './components/WeatherDetails';
import { MdOutlineCancel } from "react-icons/md";
import LastFiveSearches from './components/LastFiveSearches';

function HomePage() {

    const [city, setCity] = useState("")
    const [apiData, setApiData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [recentSearches, setRecentSearches] = useState([])
    const API_KEY = import.meta.env.VITE_API_KEY;

    const fetchWeather = async (city) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            if (!response.ok) {
                throw new Error("faled to fetch weather data ")
            }
            const data = await response.json()
            setApiData(data)
            console.log(data);

            setRecentSearches((prev) => {
                const lastfivesearches = [city, ...prev.filter(c => c !== city)];
                const updatedSearches = lastfivesearches.slice(0, 5);
                localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
                console.log(updatedSearches);
                return updatedSearches;
            });
        }
        catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const debouncedFetchWeather = useCallback(
        debounce((city) => {
            if (city.trim().length > 1) {
                fetchWeather(city);
            } else {
                setApiData({});
                setError('')
            }
        }, 1500),
        []
    );

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || []
        setRecentSearches(storedSearches)
    }, [])

    useEffect(() => {
        debouncedFetchWeather(city);
    }, [city, debouncedFetchWeather]);

    const handleCityClick = (selectedCity) => {
        setCity(selectedCity); 
    };


    return (
        <div
            className='homepage'
            style={{
                backgroundImage: `url(${weatherapp})`,
                height: '100vh',
                width: '100vw',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: 0,
                padding: 0
            }}
        >
            <div className='homepage-content'>
                <div className="header">
                    <span className='title'>
                        weather forecast for :  {city &&
                            <div className='main-heading'>
                                <span className='city'>{apiData.name}</span>
                                {/* <MdOutlineCancel size={24} /> */}
                            </div>
                        }
                    </span>
                    <span>
                        <MdOutlineLightMode size={28} />
                    </span>
                </div>
                <div className="searchinput">
                    <input type='text' placeholder='search your city here ...' value={city} onChange={(e) => setCity(e.target.value)} />
                    <button>Search</button>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                {
                    apiData.weather && apiData.weather.length > 0 && apiData.main && <WeatherDetails apiData={apiData} />
                }
                {
                   apiData.main  && <LastFiveSearches searches={recentSearches} onCityClick={handleCityClick} />
                }
            </div>
        </div>

    )
}

export default HomePage