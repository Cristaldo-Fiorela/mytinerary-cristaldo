import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TineraryCard from "./Tinerary";
import RecipeReviewCard from "./Tinerary2";

import '../styles/details.css'

function Details() {

    const { idCity } = useParams()
    
    const [dataCities, setDataCities] = useState([]) //declaro const donde voy a guardar mi data de la API


    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.

        axios.get(`http://localhost:4000/api/cities/${idCity}`) //pedimos traer nuestra api con axios que es una libreria HTTP (protocolo de transferencia de hipertexto)
            .then(res => { //una vez traido, defino la respuesta
                setDataCities(res.data.response)
            })
    },[idCity])

    return (
        <>
            <div className="cityImage" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + (dataCities.image)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
                <div className="bgColor">
                    <h5 className="cityTitle">Welcome to {dataCities.name}</h5>
                </div>
            </div>
            <div className="containerDetails">
                <div>
                    <TineraryCard/>
                    <RecipeReviewCard/>
                </div>
            </div>
        </>
    )
}

export default Details