import axios from "axios";   //importamos axios porque vamos a fechear


const itineraryActions = {

    getItineraries: () => { //funcion
        return async (dispatch, getState) => { //propiedades de despacho y estado
            const res = await axios.get('http://localhost:4000/api/itinerary')
            dispatch({type: 'GET_ITINERARIES', payload:res.data.response.itinerary}) //despacho con el tipo de caso de mi reducer y el payload que es la respuesta en formato de objeto
        }
    },

    getOneItinerary: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itinerary/${id}`)
            return res.data.response
            // dispatch({type: 'GET_ONE_ITINERARY', payload:res.data.response})
            
        }
    },

    getItinerayByIdCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/getItineraryByIdCity/${id}`)
            dispatch({type: 'GET_ITINERARY_BY_ID_CITY', payload:res.data.response})
        }
    }, 

    likeAndDislikes: (tineraryId) => {
        const token = localStorage.getItem('token')
        console.log(token) //llega
        //console.log(tineraryId) //llega
        return async () => {
            try {
                let res = await axios.put(`http://localhost:4000/api/itinerary/like/${tineraryId}`, {},
                {headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            //console.log(res)
            return res
            } catch (error) {
                console.log(error.message)
            }
        }
    },
}

export default itineraryActions