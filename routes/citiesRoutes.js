const Router = require('express').Router();

const citiesControllers =  require('../controllers//citiesControllers')
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers


Router.route('/Cities')
.get(getCities)
.post(addCity)

Router.route('/Cities:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

module.exports = Router