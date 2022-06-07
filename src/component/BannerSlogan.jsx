import React from "react";
import '../styles/banner.css'
//importa la imagen a utilizar y la llama dentro de la funcion {}

function BannerSlogan() {
    return (
        <div className="banner">
            <video autoPlay loop muted>
                <source src="" type="video" />
            </video>
            <h1>Find your perfect trip, designed by insiders who know and love their cities!</h1>
        </div>
    )
}

export default BannerSlogan