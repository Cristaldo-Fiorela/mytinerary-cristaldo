import React from "react";
import { useParams } from "react-router-dom";
import dataCities from '../dataCities';

import '../styles/details.css'

function Details () {

    const {idCities} = useParams()
    console.log(idCities)

    let cityFilter = dataCities.find(event => { //buscamos el primer elemento que coindida con el parametro pasado
        return event.id === idCities
    })
    return (
        <div className="containerDetails">
            <div className="cityImage" style={{ backgroundImage: `url(${process.env.PUBLIC_URL+(cityFilter.image)})` }}/>
            <h2 className="cityTitle">{cityFilter.name}</h2>
            <p className="cityDescription">{cityFilter.description}</p>
        </div>
    )
}

export default Details