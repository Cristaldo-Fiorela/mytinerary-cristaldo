import React from 'react'
import { Card, Accordion } from '@mui/material' //desesctructurar                                                                                                                                                                                                                             


import '../styles/tinerary.css'

function TineraryCard() {
    return (
        <>
        <Card className='card'>
            <div>
                <h3>TOUR NAME</h3>
            </div>

            <div>
                <img src={process.env.PUBLIC_URL + "/assets/users/1.jpg"} alt='userProfile'/>
                <p>userName</p>
            </div>
            <div>
                <p>price 💴💴💴   |</p>
                <p>duration ⏲</p>
                <p>|   likes ❤</p>
            </div>
        </Card>

        </>
    )
}

export default TineraryCard
