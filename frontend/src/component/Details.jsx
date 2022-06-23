import { React, useEffect} from "react";
import { useParams } from "react-router-dom";
import TineraryCard from "./Tinerary";
import { useDispatch, useSelector } from "react-redux";
//import RecipeReviewCard from "./Tinerary2";

import '../styles/details.css'
import citiesActions from "../redux/actions/citiesActions";

function Details() {

    const { idCity } = useParams()
    const dispatch = useDispatch()

    
    const dataCities = useSelector(store => store.citiesReducer.oneCity) //declaro const donde voy a guardar mi data de la API
    //console.log(dataCities)

    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.

        dispatch(citiesActions.getOneCity(idCity)) //

        // axios.get(`http://localhost:4000/api/cities/${idCity}`) //pedimos traer nuestra api con axios que es una libreria HTTP (protocolo de transferencia de hipertexto)
        //     .then(res => { //una vez traido, defino la respuesta
        //         setDataCities(res.data.response)
        //     })
    },[])


    return (
        <>
            <div className="cityImage" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + (dataCities.image)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
                <div className="bgColor">
                    <h5 className="cityTitle">Welcome to {dataCities.name}</h5>
                </div>
            </div>
            <div className="containerDetails">
                <div>
                    <TineraryCard />
                </div>
            </div>
        </>
    )
}

export default Details