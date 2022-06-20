//const mongoose = require ('mongoose') // se conecta a mongo 


const itinerarySchema = new mongoose.Schema({
    name: {type:String, required:true},
    userName: {type:String, required:true},
    userPhoto: {type:String, required:true},
    price: {type:String, required:true},
    duration: {type:String, required:true},
    hashtags: {type:String, required:true},
    like: {type:String, required:true},
    activities: {type:String, required:true}
})

const Itinerary =  mongoose.model('itinerary', itinerarySchema) 
module.exports = Itinerary
