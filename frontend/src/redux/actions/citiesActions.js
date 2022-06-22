import axios from "axios";   //importamos axios porque vamos a fechear


const citiesActions = {

    getCities: () => { //funcion
        return async (dispatch, getState) => { //propiedades de despacho y estado
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: 'GET_CITIES', payload:res.data.response.cities}) //despacho con el tipo de caso de mi reducer y el payload que es la respuesta en formato de objeto
        }
    }
}

export default citiesActions