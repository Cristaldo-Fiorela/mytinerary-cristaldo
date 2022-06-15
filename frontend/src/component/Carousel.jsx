import { React} from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";


import '../styles/carousel.css'


// import required modules
import { Grid, Pagination, Navigation, Autoplay } from "swiper";



function PopularTinerary(props) {

    return (
        <div className="popularContainer">
            <div className="popularMyTinerary">
                <h2 className="slogan-h1">Popular MyTineraries</h2>
            </div>
            <div className="containerCarousel">
                <Swiper
                    slidesPerView={2}
                    slidesPerGroup={2}
                    grid={{
                        rows: 2,
                    }}
                    spaceBetween={20}
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
                    {props.allCities.map((city, index) =>
                        <SwiperSlide key={index}
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + (city.image)})` }}
                            className="carruselImages"
                        >
                            <div className="titleContainer">
                                <h3 className="swiperTitle">{(city.name)}</h3>
                            </div>
                        </SwiperSlide>)}
                </Swiper>
            </div>
        </div >
    )
}

export default PopularTinerary
