import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/carousel.css";

// import required modules
import { Pagination, Navigation } from "swiper";


function Carousel(props) {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                slidesPerGroup={3}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
            

            {props.allCities.map(city =>
                <SwiperSlide key={city.id}>
                    <img href={city.image} alt="hola"></img> 
                </SwiperSlide>
            )}
            
            </Swiper>
        </>
    );
}

export default Carousel