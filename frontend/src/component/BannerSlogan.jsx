import React from "react";
import '../styles/banner.css'

function BannerSlogan() {
    return (
        <div className="banner">
            
            <video className="background-video" autoPlay loop muted >
                <source src='https://i.imgur.com/9waHzuw.mp4' type='video/mp4' />
            </video>
            <img className="logo-banner" src='https://i.imgur.com/0MtMWli.png' alt="logo" />
            <h1 className="slogan-h1">Find your perfect trip, designed by insiders who know and love their cities!</h1>
        </div>
    )
}

export default BannerSlogan