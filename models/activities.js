const mongoose = require ('mongoose')


const activitiesSchema = new mongoose.Schema({
    activitiesName: [{type:String, required:true}],
    activitiesPhotos: [{type:String, required:true}],
})

const Activity =  mongoose.model('activities', activitiesSchema) 
module.exports = Activity
