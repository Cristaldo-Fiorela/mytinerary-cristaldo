import React from 'react'
import { Card } from '@mui/material' //desesctructurar                                                                                                                                                                                                                             


import '../styles/tinerary.css'

function TineraryCard() {
    return (
        <>
        <Card className='card'>
            <h3>TOUR NAME</h3>
            <img src={process.env.PUBLIC_URL + "/assets/users/1.jpg"} alt='userProfile'/>
        </Card>

        </>
    )
}

export default TineraryCard
