const Router = require('express').Router();

const citiesControllers =  require('../controllers/citiesControllers')
const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = citiesControllers

const itineraryControllers =  require('../controllers/itineraryControllers')
const {getItinerary, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItinerary} = itineraryControllers

Router.route('/cities')
.get(getCities)
.post(addCity)


Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)


Router.route("/multiplesCities")
.post(multiplesCities)

////////////////////////////////////////////////////////////

Router.route('/itinerary')
.get(getItinerary)
.post(addItinerary)

Router.route('/itinerary/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)


Router.route("/multiplesItinerary")
.post(multiplesItinerary)

module.exports = Router