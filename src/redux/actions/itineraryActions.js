import axios from "axios";   


const itineraryActions = {

    getItineraries: () => { 
        return async (dispatch, getState) => { 
            const res = await axios.get('https://mytinerary-back-cristaldo.herokuapp.com/api/itinerary')
            dispatch({type: 'GET_ITINERARIES', payload:res.data.response.itinerary}) 
        }
    },

    getOneItinerary: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`https://mytinerary-back-cristaldo.herokuapp.com/api/itinerary/${id}`)
            return res.data.response
            
        }
    },

    getItinerayByIdCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`https://mytinerary-back-cristaldo.herokuapp.com/api/getItineraryByIdCity/${id}`)
            dispatch({type: 'GET_ITINERARY_BY_ID_CITY', payload:res.data.response})
        }
    }, 

    likeAndDislikes: (tineraryId) => {
        const token = localStorage.getItem('token')
        return async () => {
            try {
                let res = await axios.put(`https://mytinerary-back-cristaldo.herokuapp.com/api/itinerary/like/${tineraryId}`, {},
                {headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            return res
            } catch (error) {
                console.log(error.message)
            }
        }
    },
}

export default itineraryActions