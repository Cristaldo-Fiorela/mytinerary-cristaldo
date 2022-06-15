require('dotenv').config() 
require('./config/config') //llamo a configuracion de mongo

const express = require ('express')
const Router = require('./routes/citiesRoutes')
const PORT = 4000
const cors = require ('cors') //importo mi cors de seguridad metodo
const app = express()


// Middlewares
app.use(express.json()) //transporta la data a front convertido en json
app.use(cors()) // metodo
app.use('/api', Router)

app.set ('port', PORT)

app.get ('/', (req, res) => {
    res.send('SERVIDOR CREADO!')
})

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO EN PUERTO: ' + app.get ('port'))
})