import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as LinkRouter } from 'react-router-dom';
import SearchError from './SearchError';
import { connect } from 'react-redux';
import citiesActions from "../redux/actions/citiesActions";




import '../styles/cities.css'
import { useEffect } from 'react';

function DisplayCardCities(props) {

    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }

    const [search, setSearch] = React.useState(' ')
    
    useEffect(() => { //Acepta una función que contiene código imperativo, posiblemente código efectivo.
        props.getCities()
    },[])

    let cityFiltered = props.cities.filter(city => city.name.toLowerCase().startsWith(search.trim().toLowerCase()))


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
                {cityFiltered.length > 0 ? (
                cityFiltered.map((city, index) =>
                    <Card
                        sx={{ backgroundImage: `url(${process.env.PUBLIC_URL + (city.image)})` }}
                        key={index}
                        className="Card overlay"
                        onClick={ScrollToTop}
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
                    )
                ) : (< SearchError />)
                }
            </div>
        </>
    );
}

const mapDispatchProps = {
    getCities: citiesActions.getCities,
}

const mapStateToProps = (state)  => {
    return{
        cities: state.citiesReducer.cities,
        aux: state.citiesReducer.aux
    }
}


export default connect(mapStateToProps, mapDispatchProps) (DisplayCardCities);