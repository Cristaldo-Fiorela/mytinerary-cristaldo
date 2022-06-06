import React from "react";
import '../styles/banner.css'
//importa la imagen a utilizar y la llama dentro de la funcion {}
import bannerGeisha from '../asserts/geisha-removebg-preview.png'


function BannerSlogan() {
    return (
        <div className="banner">
            <h1>Find your perfect trip, designed by insiders who know and love their cities!</h1>
            <img src={bannerGeisha} alt="geisha" />
        </div>
    )
}

export default BannerSlogan