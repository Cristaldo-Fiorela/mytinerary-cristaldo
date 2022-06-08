import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";


import '../styles/carousel.css'


// import required modules
import { Grid, Pagination, Navigation, Autoplay} from "swiper";


function popularTinerary(props) {
    return (
        <div className="contenedorPopular">
            <div className="popularMyTinerary">
                <h2>Popular MYtineraries</h2>
            </div>
            <div>
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
                    <img src={process.env.PUBLIC_URL+(city.image)} alt="Japan's Cities" />
                </SwiperSlide>)}
            </Swiper>
            </div>
        </div >
    )
}

export default popularTinerary
