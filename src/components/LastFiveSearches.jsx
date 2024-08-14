import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TiWeatherCloudy } from "react-icons/ti";

function LastFiveSearches({ searches, onCityClick }) {
    const settings = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <span className='recent-heading'>You recently searched for: </span>
            <Slider {...settings} style={{ marginTop: "20px" }}>
                {searches.map((city, index) => (
                    <div key={index} className='recentsearches' onClick={() => onCityClick(city)}>
                        <div className='fetch-recent-data'>
                            <span>{city}</span>
                            <TiWeatherCloudy size={24} color='white' />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default LastFiveSearches;
