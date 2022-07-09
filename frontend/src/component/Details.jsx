import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import TineraryCard from "./Tinerary";
import { useDispatch, useSelector } from "react-redux";
import itineraryActions from '../redux/actions/itineraryActions'
import NotItinerary from "./NotItinerary";


import '../styles/details.css'
import citiesActions from "../redux/actions/citiesActions";

function Details() {

    const { idCity } = useParams()
    const dispatch = useDispatch()


    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.

        dispatch(citiesActions.getOneCity(idCity))
        dispatch(itineraryActions.getItinerayByIdCity(idCity))
        // eslint-disable-next-line
    }, [])

    const dataCities = useSelector(store => store.citiesReducer.oneCity) //declaro const donde voy a guardar mi data de la API
    const itineraries = useSelector(store => store.itinerariesReducer.getItinerayByIdCity)


    return (
        <>
            <div className="cityImage" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + (dataCities.image)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
                <div className="bgColor">
                    <h5 className="cityTitle">Welcome to {dataCities.name}</h5>
                </div>
            </div>
            <div className="containerTineraries">
                    {itineraries.length > 0 ? (
                        itineraries.map((itinerary) =>
                            <TineraryCard  
                            _id= {itinerary._id} 
                            name= {itinerary.name} 
                            userPhoto={itinerary.userPhoto} 
                            userName={itinerary.userName} 
                            price={itinerary.price} 
                            duration={itinerary.duration} 
                            hashtags={itinerary.hashtags}
                            like= {itinerary.like}
                            key={itinerary._id}
                            activities={itinerary.activities}
                            allProps={itinerary}
                            />
                        )) : <NotItinerary/> } 
            </div>
        </>
    )
}

export default Details