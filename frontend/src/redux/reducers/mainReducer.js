import { combineReducers } from "redux"
import citiesReducer from './citiesReducer'
import itinerariesReducer from "./itineraryReducer"
import usersReducer from './usersReducer'


const mainReducer = combineReducers ({
    citiesReducer,
    itinerariesReducer,
    usersReducer
})

export default mainReducer