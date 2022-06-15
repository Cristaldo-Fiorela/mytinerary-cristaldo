
const Cities = require('../models/cities')

const citiesControllers = { 


    getCities: async (req, res) => {
    
    // primera parte de funcion donde se declaran los datos
        let cities 
        let error = null //valor inicial de error
    
    // parte de prueba "try" (intento) catch (atrapa errores)
        try {
            cities = await Cities.find()
        } catch (err) {error = err} // si cacheo el error puedo hacer cosas con el error
    
    // parte de la respuesta a la segunda parte de la funcion -> try catch
        res.json({
            response: error ? 'ERROR' : { cities },
            success: error ? false : true,
            error: error
        })
    },

    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.findOne({_id:id})
        } catch(err) {
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false: true,
            error: error
        })
    },

    addCity:async (req,res) => {
        const {name,image,description}=req.body.data
        let city
        let error = null

        try{
            city = await new Cities({
                name:name,
                image:image,
                description: description
            }).save()
        }catch(err){error = err}

        res.json({
            response: error ? 'ERROR' :city,
            success: error ? false : true,
            error: error
        })
    },
    
    modifyCity: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let cityModified
        let error = null

        try {
            cityModified = await Cities.findOneAndUpdate({ _id:id}, city, { new: true })
        } catch (err) {error = err}

        res.jason({
            response: error ? 'ERROR' : cityModified,
            success: error ? false : true,
            error: error
        })
    },
    
    removeCity: async (req,res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.findOneAndDelete({_id: id})
        } catch (err) { error = err }

        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error : error
        })
    }
    
}

module.exports = citiesControllers