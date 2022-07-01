require('dotenv').config()  //libreria dotenv
require('./config/config') //llamo a configuracion de mongo

const cors = require ('cors') //importo mi cors de seguridad metodo
const passport = require('passport')
const express = require ('express')


const Router = require('./routes/citiesRoutes')
const PORT  = 4000 
// process.env.SERVER_PORT


const app = express()


// Middlewares
app.use(express.json()) //transporta la data a front convertido en json
app.use(cors()) // metodo
app.use(passport.initialize())
app.use('/api', Router) //conecta la app con el endpoint

app.set ('port', PORT)

app.get ('/', (req, res) => {
    res.send('SERVIDOR CREADO!')
})

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO EN PUERTO: ' + app.get ('port'))
})