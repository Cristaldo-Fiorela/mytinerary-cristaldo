//REACT
import * as React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//ACTIONS AND COMPONENTS
import citiesActions from '../redux/actions/citiesActions';
import SearchError from './SearchError';





import '../styles/cities.css'

function DisplayCardCities() {

    const ScrollToTop = () =>  {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left:0
        })
    }

    const [search, setSearch] = React.useState(' ')

    const dispatch = useDispatch()


    React.useEffect(() =>{
        dispatch(citiesActions.filterCities(search)) 
        // eslint-disable-next-line
    },[search])

    const cityFiltered = useSelector (store => store.citiesReducer.cityFiltered) 


    return (
        <>
            <form className="search">
                <label>Search:</label>
                <input
                    className='inputCities'
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
                        sx={{ backgroundImage: `url(${(city.image)})` }}
                        key={index}
                        className="Card overlay"
                        onClick={ScrollToTop}
                    >
                        <LinkRouter
                            className='underlineNone'
                            to={`/cities/${city._id}`}
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

export default (DisplayCardCities);