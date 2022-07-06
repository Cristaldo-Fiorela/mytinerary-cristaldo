const Router = require('express').Router();
const validator = require('../config/validator')
const passport = require('../config/passport')

const citiesControllers =  require('../controllers/citiesControllers')
const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = citiesControllers

const itineraryControllers =  require('../controllers/itineraryControllers')
const {getItinerary, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItinerary, getItineraryByIdCity} = itineraryControllers

const userControllers = require('../controllers/usersControllers')
const { signInUser, signUpUsers, verifyMail, verifyToken, signOut} = userControllers

const activitiesControllers = require('../controllers/activitiesControllers')
const { getActivities, getOneActivity, addActivity, modifyActivity, removeActivity, multiplesActivities, getActivityByIdTinerary } = activitiesControllers

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
.post(validator, signUpUsers)


Router.route('/auth/signIn')
.post(signInUser)

Router.route('/verify/:string') // RECIBE LE LINK DEL USUARIO
.get(verifyMail) //LLAMA A FUNCION DE VERIFICACION

Router.route('/auth/signOut')
.post(signOut)

Router.route('/auth/signInToken')
.get(passport.authenticate('jwt', { session: false }), verifyToken)


//////////////////////////////ACTIVITIES ROUTES/////////////////////////

Router.route('/activities')
.get(getActivities)
.post(addActivity)

Router.route('/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

Router.route('/multiplesActivities')
.post(multiplesActivities)

Router.route('/getActivityByIdTinerary/:id')
.get(getActivityByIdTinerary)


module.exports = Router


