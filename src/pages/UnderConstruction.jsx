import React from "react";
import { Link as LinkRouter } from "react-router-dom";


import "../styles/citiesWip.css"

function UnderConstruction() {
    
    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }
    return (
        <div className="containerCitiesBody">
        <div className="containerConstruction">
            <div>
                <h1>Page Under Construction</h1>
                <h2>Sorry for the inconvenience.</h2>
                <LinkRouter to='/cities'>
                    <button onClick={ScrollToTop} className="learn-more">Back to Cities</button>
                </LinkRouter>
            </div>
            <img className="geishaMessage" src='https://i.imgur.com/tbao18S.png' alt="messageUnderConstruction" />
        </div>
        </div>
    )
}

export default UnderConstruction