const initialState = {
    cities: [],
    oneCity: {},
    cityFiltered: []    
}


const citiesReducer = (state = initialState, action) => { 
    
    switch (action.type) { 
        case 'GET_CITIES':
            return{
                ...state,
                cities: action.payload, 
                cityFiltered: action.payload 
            }
        
        case 'GET_ONE_CITY': 
            return {
                ...state,
                oneCity: action.payload, 
            }

        case 'FILTER_CITIES':

            let filterCities = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))

            return {
                ...state, 
                cityFiltered: filterCities 
            }
        
        default:
            return state 
        
    }
}



export default citiesReducer




