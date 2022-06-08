import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";


import "../styles/carousel2.css";

// import required modules
import { Grid, Pagination, Navigation, Autoplay} from "swiper";

export default function CarouselCities(props) {
    return (
        <>
            <Swiper
                slidesPerView={2}
                slidesPerGroup={3}
                grid={{
                    rows: 2,
                }}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Grid, Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {props.allCities.map( (city, index) =>
                <SwiperSlide key={index}>
                    <img rc={process.env.PUBLIC_URL+(city.image)} alt="logo" />
                </SwiperSlide>)}
            </Swiper>
        </>
    );
}
