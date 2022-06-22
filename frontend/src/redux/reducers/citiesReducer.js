const initialState = {
    cities: [],
    aux: [] //array auxiliar donde voy a guardar cosas de momento que no quiero q modifiquen mi array prtincipal
}

const citiesReducer = (state = initialState, action) => { //parametros de la funciona iniciada dentro de la constante
    
    switch (action.type) { //condicion de mi switch
        case 'GET_CITIES':
            return{
                ...state,
                cities: action.payload, //llena mis arrays vacios con el payload y lo retorna si la condicion se cumple
                aux: action.payload
            }
        
            default:
                return state //array vacio inicial. el de default
        
    }
}

export default citiesReducer




