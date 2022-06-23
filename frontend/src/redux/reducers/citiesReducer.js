const initialState = {
    cities: [],
    oneCity: {},
    cityFiltered: []
    // aux: [] //array auxiliar donde voy a guardar cosas de momento que no quiero q modifiquen mi array prtincipal
    
}

// TODO: getCities, getOneCities, getCitiesFilter

const citiesReducer = (state = initialState, action) => { //parametros de la funciona iniciada dentro de la constante
    
    switch (action.type) { //condicion de mi switch
        case 'GET_CITIES':
            return{
                ...state,
                cities: action.payload, //llena mis arrays vacios con el payload y lo retorna si la condicion se cumple
                cityFiltered: action.payload // la cargo con todo el array porque tengo q hacer primero una busqueda porq sino de entrada no me aparecen
            }
        
        case 'GET_ONE_CITY': 
            return {
                ...state,
                oneCity: action.payload, //llena mis arrays vacios con el payload y lo retorna si la condicion se cumple
            }

        case 'FILTER_CITIES':

            let filterCities = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))

            return {
                ...state, // tomo el estado incial de mi array
                cityFiltered: filterCities // le guardo mi nuevos datos
            }
        
        default:
            return state //array vacio inicial. el de default
        
    }
}



export default citiesReducer




