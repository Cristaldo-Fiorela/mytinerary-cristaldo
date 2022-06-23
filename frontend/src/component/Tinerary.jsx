import React from 'react'
import { Card} from '@mui/material' //desesctructurar     
import { useParams } from 'react-router-dom'                                                                                                                                                                                                                        
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import itineraryActions from '../redux/actions/itineraryActions'
import '../styles/tinerary.css'


function TineraryCard() {

    const { idCity } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(itineraryActions.getItinerayByIdCity(idCity))
    },[])

    const itineraries = useSelector(store => store.itinerariesReducer.getItinerayByIdCity)
    console.log(itineraries)



    return (
        <>
        {itineraries.map((itinerary, index) =>
        <Card 
        key={index}
        className='card'
        >
            <div>
                <p>{itinerary.name}</p>
            </div>

            <div>
                <img src={process.env.PUBLIC_URL+ (itinerary.userPhoto)} alt='userName'/>
                <p>{itinerary.userName}</p>
            </div>
            <div>
                <p>price {itinerary.price}|</p>
                <p>{itinerary.duration }⏲</p>
                <p>|   likes ❤</p>
            </div>
        </Card>
        )}
        </>
    )
}

export default TineraryCard
