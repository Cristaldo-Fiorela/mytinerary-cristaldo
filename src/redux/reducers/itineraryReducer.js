const initialState = {
    itineraries: [],
    getOneItinerary: {},
    getItinerayByIdCity: []
}

const itinerariesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_ITINERARIES':
            return {
                ...state,
                itineraries: action.payload
            }
        case 'GET_ONE_ITINERARY':
            return {
                ...state,
                getOneItinerary: action.payload
            }
        case 'GET_ITINERARY_BY_ID_CITY':
            return {
                ...state,
                getItinerayByIdCity: action.payload
            }
        default:
            return state
    }
}

export default itinerariesReducer