import { React} from "react";
import { useEffect, useState } from "react";
import axios from "axios";

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



function PopularTinerary() {

    const [dataCities, setDataCities] = useState([]) //declaro const donde voy a guardar mi data de la API


    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.

        axios.get('http://localhost:4000/api/cities') //pedimos traer nuestra api con axios que es una libreria HTTP (protocolo de transferencia de hipertexto)
            .then(res => { //una vez traido, defino la respuesta
                setDataCities(res.data.response.cities)
            })
    },[])

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
                    {dataCities.map((city, index) =>
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
