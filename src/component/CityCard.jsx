import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dataCities from '../dataCities';



import '../styles/cities.css'
import { useEffect } from 'react';

function DisplayCardCities() {

    const [cities, setCities] = React.useState([])
    const [search, setSearch] = React.useState(' ')

    useEffect(()=>{
        setCities(dataCities)

        let city = dataCities.filter(city => city.name.toLowerCase().startsWith(search.trim().toLowerCase()))
        setCities(city)
    },[search])

    return (
        <>
            <form className="search">
                <label>Search:</label>
                <input 
                type="text" 
                placeholder="Search..." 
                id="search"
                onKeyUp= {(evento) =>{
                    setSearch(evento.target.value)
                }}
                />
            </form>
            <div className='cardContainer'>
                {cities.map((city, index) =>
                    <Card
                        sx={{ backgroundImage: `url(${process.env.PUBLIC_URL + (city.image)})` }}
                        key={index}
                        className="Card overlay"
                    >
                        <CardContent className='cardContent'>
                            <Typography gutterBottom variant="h5">
                                {city.name}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

export default DisplayCardCities;