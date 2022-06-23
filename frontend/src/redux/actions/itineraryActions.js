import axios from "axios";   //importamos axios porque vamos a fechear


const itineraryActions = {

    getItineraries: () => { //funcion
        return async (dispatch, getState) => { //propiedades de despacho y estado
            const res = await axios.get('http://localhost:4000/api/itinerary')
            console.log(res)
            dispatch({type: 'GET_ITINERARIES', payload:res.data.response.itinerary}) //despacho con el tipo de caso de mi reducer y el payload que es la respuesta en formato de objeto
        }
    },

    getOneCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itinerary/${id}`)
            console.log("hola soy una respuesta de citiesAction: " + res)
            dispatch({type: 'GET_ONE_ITINERARY', payload:res.data.response})
        }
    },

    getItinerayByIdCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/getItineraryByIdCity/${id}`)
            console.log(res)
            dispatch({type: 'GET_ITINERARY_BY_ID_CITY', payload:res.data.response})
        }
    }

}

export default itineraryActions