const mongoose = require ('mongoose')

const userSchema =  new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email:{type:String, required:true},
    password: [{type:String, required:true}],
    from:{type:Array}, // hace referencia al metodo con el que nos registremos (FB, GOOGLE, NUESTRO SIGN IN)
})

const User = mongoose.model('users', userSchema)
module.exports = User