import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import dataCities from '../dataCities';
import axios from "axios";

import '../styles/details.css'

function Details() {

    const [dataCities, setDataCities] = useState([]) //declaro const donde voy a guardar mi data de la API
    const { idCities } = useParams()

    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.

        axios.get(`http://localhost:4000/api/cities/${idCities}`) //pedimos traer nuestra api con axios que es una libreria HTTP (protocolo de transferencia de hipertexto)
            .then(res => { //una vez traido, defino la respuesta
                setDataCities(res.data.response)
            })
    }, [])

    return (
        <div className="containerDetails">
            <div className="cityImage" style={{ backgroundImage: `url(${process.env.PUBLIC_URL+(dataCities.image)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}} />
            <h2 className="cityTitle">{dataCities.name}</h2>
            <p className="cityDescription">{dataCities.description}</p>
        </div>
    )
}

export default Details