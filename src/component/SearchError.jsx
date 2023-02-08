//REACT
import React from "react";

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//STYLES
import '../styles/cities.css'

function SearchError () {

    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }
    return(
        <>
        
        <Card
            sx={{ backgroundImage: `url(https://i.pinimg.com/originals/bc/e3/8e/bce38eb75d3cf9f78adef39fa041cd3b.gif)` }}
            className="Card overlay"
            onClick={ScrollToTop}
        >

            <CardContent className='cardContent'>
                <Typography gutterBottom variant="h5">
                    We couldn't find any city.
                </Typography>
            </CardContent>
        </Card>
        </>
    )
}

export default SearchError