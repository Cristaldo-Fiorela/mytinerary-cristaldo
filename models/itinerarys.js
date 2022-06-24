const mongoose = require ('mongoose')


const itinerarySchema = new mongoose.Schema({
    name: {type:String, required:true},
    userName: {type:String, required:true},
    userPhoto: {type:String, required:true},
    price: {type:String, required:true},
    duration: {type:String, required:true},
    hashtags: {type:Array, required:true},
    like: {type:String},
    activities: {type:Array},
    idCity: {type:mongoose.Types.ObjectId, ref:'cities'}
})

const Itinerary =  mongoose.model('itinerary', itinerarySchema) 
module.exports = Itinerary // se exporta en los controladores
