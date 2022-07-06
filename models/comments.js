const mongoose = require ('mongoose')


const commentsSchema = new mongoose.Schema({
    userId: [{type:String }],
    message: [{type:String}],
})

const Comment =  mongoose.model('comments', commentsSchema) 
module.exports = Comment
