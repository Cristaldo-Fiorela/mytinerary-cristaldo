//ESQUEMA DE LO QUIERO OBTENES

const mongoose = require ('mongoose') // se conecta a mongo 


const citySchema = new mongoose.Schema({
    name: {type:String, required:true},
    image: {type:String, required:true},
    description: {type:String, required:true}
})

const City =  mongoose.model('cities', citySchema) 
module.exports = City


