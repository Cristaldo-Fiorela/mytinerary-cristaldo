const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')

module.exports = passport.use(
    new jwtStrategy( //estrategia que establecemos para trabajar 
        {jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), //extrae los token de los headers y lo compara con el secret token de la aut del header con el metodo bearer
        secretOrKey: process.env.SECRET_KEY}, // desencripta el token
        (jwt_payload,done) => {
            //console.log(jwt_payload)
            User.findOne({_id:jwt_payload.id}) //busca id del payload que coincida con el id de user
            .then(user => {
                //console.log(user)
                if (user) {
                    return done(null, user)
                }
                else if (err) {
                    //console.log(err)
                    return done(err, false);
                }
                else{
                    return done(null, false)
                }
                })
            
            .catch(err => {
                console.log(err)
                return done(err,false)
            })
        }
))