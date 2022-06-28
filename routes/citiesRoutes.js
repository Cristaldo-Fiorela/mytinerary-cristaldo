const Router = require('express').Router();

const citiesControllers =  require('../controllers/citiesControllers')
const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = citiesControllers

const itineraryControllers =  require('../controllers/itineraryControllers')
const {getItinerary, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItinerary, getItineraryByIdCity} = itineraryControllers

const userControllers = require('../controllers/usersControllers')
const { signInUser, signUpUsers } = userControllers


/////////////////////////////CITIES ROUTE////////////////////////////////



Router.route('/cities')
.get(getCities)
.post(addCity)


Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)


Router.route("/multiplesCities")
.post(multiplesCities)

/////////////////////////////ITINERARIES ROUTE////////////////////////////////


Router.route('/itinerary')
.get(getItinerary)
.post(addItinerary)

Router.route('/itinerary/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route('/multiplesItinerary')
.post(multiplesItinerary)

Router.route('/getItineraryByIdCity/:id')
.get(getItineraryByIdCity)



/////////////////////////////USER ROUTE////////////////////////////////



Router.route('/auth/signUp')
.post(signUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

// Router.route('/:uniqueString') // RECIBE LE LINK DEL USUARIO
// .get(verifyEmail) //LLAMA A FUNCION DE VERIFICACION

// Router.route('/auth/signInToken')
// .get(passport.authenticate('jwt', { session: false }), verifyToken)


module.exports = Router


