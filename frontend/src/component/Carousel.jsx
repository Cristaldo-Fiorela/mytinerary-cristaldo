import { React} from "react";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import { useSelector } from 'react-redux';



// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import CSS
import '../styles/carousel.css'

// import required modules
import { Grid, Pagination, Navigation, Autoplay } from "swiper";



function PopularTinerary() {

    const cities = useSelector(store => store.citiesReducer.cities)


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
                    {cities.map((city, index) =>
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

const mapDispatchProps = {
    getCities: citiesActions.getCities,
}

const mapStateToProps = (state)  => {
    return{
        cities: state.citiesReducer.cities,
        aux: state.citiesReducer.aux
    }
}

export default connect(mapStateToProps, mapDispatchProps) (PopularTinerary)
