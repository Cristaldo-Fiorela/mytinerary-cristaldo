import axios from "axios";   


const citiesActions = {

    getCities: () => {
        return async (dispatch, getState) => { 
            const res = await axios.get('https://mytinerary-back-cristaldo.herokuapp.com/api/cities')
            dispatch({type: 'GET_CITIES', payload:res.data.response.cities}) 
        }
    },

    getOneCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`https://mytinerary-back-cristaldo.herokuapp.com/api/cities/${id}`)
            dispatch({type: 'GET_ONE_CITY', payload:res.data.response})
        }
    },

    filterCities: (input) => {
        return (dispatch, getState) => {
            dispatch ({ type: 'FILTER_CITIES', payload: input})
        }
    }

}

export default citiesActions