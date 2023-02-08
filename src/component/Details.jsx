//REACT
import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//ACTIONS AND COMPONENT
import itineraryActions from '../redux/actions/itineraryActions'
import citiesActions from "../redux/actions/citiesActions";
import TineraryCard from "./Tinerary";
import NotItinerary from "./NotItinerary";

//STYLES 
import '../styles/details.css'


function Details() {

    const { idCity } = useParams()
    const dispatch = useDispatch()


    useEffect(() => { 

        dispatch(citiesActions.getOneCity(idCity))
        dispatch(itineraryActions.getItinerayByIdCity(idCity))
        // eslint-disable-next-line
    }, [])

    const dataCities = useSelector(store => store.citiesReducer.oneCity) 
    const itineraries = useSelector(store => store.itinerariesReducer.getItinerayByIdCity)


    return (
        <>
            <div className="cityImage" style={{ backgroundImage: `url(${(dataCities.image)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
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