const mongoose = require ('mongoose')


const itinerarySchema = new mongoose.Schema({
    name: {type:String, required:true},
    userName: {type:String, required:true},
    userPhoto: {type:String, required:true},
    price: {type:String, required:true},
    duration: {type:String, required:true},
    hashtags: {type:Array, required:true},
    like: {type:Array},
    activities: [{type:mongoose.Types.ObjectId, ref:'activities'}],
    idCity: {type:mongoose.Types.ObjectId, ref:'cities'},
    comments: [{type:mongoose.Types.ObjectId, ref:'comments'}],
})

const Itinerary =  mongoose.model('itinerary', itinerarySchema) 
module.exports = Itinerary // se exporta en los controladores
