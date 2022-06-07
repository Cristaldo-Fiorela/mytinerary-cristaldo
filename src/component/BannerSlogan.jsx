import React from "react";
import '../styles/banner.css'
//importa la imagen a utilizar y la llama dentro de la funcion {}
//import bannerSakuraBg from '../asserts/banner-sakura-bg.mp4'

function BannerSlogan() {
    return (
        <div className="banner">
            <video className="background-video" autoPlay loop muted >
                <source src={process.env.PUBLIC_URL+"/assets/banner-sakura-bg.mp4"} type='video/mp4' />
            </video>
            <h1>Find your perfect trip, designed by insiders who know and love their cities!</h1>
        </div>
    )
}

export default BannerSlogan