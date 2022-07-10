require('dotenv').config() 
require('./config/config') 

const cors = require ('cors') 
const passport = require('passport')
const express = require ('express')


const Router = require('./routes/citiesRoutes')
const PORT  = 4000 


const app = express()


// Middlewares
app.use(express.json()) 
app.use(cors()) 
app.use(passport.initialize())
app.use('/api', Router) 

app.set ('port', PORT)

app.get ('/', (req, res) => {
    res.send('SERVIDOR CREADO!')
})

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO EN PUERTO: ' + app.get ('port'))
})