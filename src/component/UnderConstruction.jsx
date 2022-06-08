import React from "react";

import "../styles/citiesWip.css"

function MessageCities() {
    return (
        <>
        <form className="search">
            <label>Search:</label>
            <input type="text" placeholder="Search..." disabled></input>
        </form>
        <div className="containerConstruction">
            <div>
                <h1>Page Under Construction</h1>
                <h2>Sorry for the inconvenience.</h2>
            </div>
            <img className="geishaMessage" src={process.env.PUBLIC_URL + "/assets/under-construction.png"} alt="messageUnderConstruction" />
        </div>
        </>
    )
}

export default MessageCities