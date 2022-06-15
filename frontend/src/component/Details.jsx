import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link as LinkRouter } from "react-router-dom";
import UnderConstruction from "./UnderConstruction";

import '../styles/details.css'

function Details() {

    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }

    const [dataCities, setDataCities] = useState([]) //declaro const donde voy a guardar mi data de la API
    const { idCities } = useParams()

    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.

        axios.get(`http://localhost:4000/api/cities/${idCities}`) //pedimos traer nuestra api con axios que es una libreria HTTP (protocolo de transferencia de hipertexto)
            .then(res => { //una vez traido, defino la respuesta
                setDataCities(res.data.response)
            })
    }, [])

    return (
        <>
            <div className="cityImage" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + (dataCities.image)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
                <div className="bgColor">
                    <h5 className="cityTitle">Welcome to {dataCities.name}</h5>
                </div>
            </div>
            <div className="containerDetails">
                <div className="diamondShape">
                    <UnderConstruction/>
                </div>
            </div>
        </>
    )
}

export default Details