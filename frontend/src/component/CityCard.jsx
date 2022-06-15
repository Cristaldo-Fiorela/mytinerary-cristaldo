import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//import dataCities from '../dataCities';
import { Link as LinkRouter } from 'react-router-dom';
import axios from 'axios'



import '../styles/cities.css'
import { useEffect } from 'react';

function DisplayCardCities() {

    const [dataCities, setDataCities] = React.useState([]) //declaro const donde voy a guardar mi data de la API
    const [search, setSearch] = React.useState(' ')
    
    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.

        axios.get('http://localhost:4000/api/cities') //pedimos traer nuestra api con axios que es una libreria HTTP (protocolo de transferencia de hipertexto)
            .then(res => { //una vez traido, defino la respuesta
                setDataCities(res.data.response.cities)
            })
    },[])

    let cityFiltered = dataCities.filter(city => city.name.toLowerCase().startsWith(search.trim().toLowerCase()))


    return (
        <>
            <form className="search">
                <label>Search:</label>
                <input
                    type="text"
                    placeholder="Search..."
                    id="search"
                    onKeyUp={(event) => {
                        setSearch(event.target.value)
                    }}
                />
            </form>
            <div className=' cardContainer'>
                {cityFiltered.map((city, index) =>
                    <Card
                        sx={{ backgroundImage: `url(${process.env.PUBLIC_URL + (city.image)})` }}
                        key={index}
                        className="Card overlay"
                    >
                        <LinkRouter
                            className='underlineNone'
                            to={`/Cities/${city._id}`}
                            key={city._id}
                        >
                            <CardContent className='cardContent'>
                                <Typography gutterBottom variant="h5">
                                    {city.name}
                                </Typography>
                            </CardContent>
                        </LinkRouter>
                    </Card>
                )}
            </div>
        </>
    );
}

export default DisplayCardCities;