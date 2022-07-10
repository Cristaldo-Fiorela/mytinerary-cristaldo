
const Itinerary = require('../models/itinerarys')

const itineraryControllers = { 


    getItinerary: async (req, res) => {
    
    // primera parte de funcion donde se declaran los datos
        let itinerary 
        let error = null //valor inicial de error
    
    // parte de prueba "try" (intento) catch (atrapa errores)
        try {
            itinerary = await Itinerary.find()
        } catch (err) {error = err} // si cacheo el error puedo hacer cosas con el error
    
    // parte de la respuesta a la segunda parte de la funcion -> try catch
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },

    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itinerary.findOne({_id:id}).populate("comments.userId", {firstName: 1, lastName: 1, userPhoto:1})
        } catch(err) {
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false: true,
            error: error
        })
    },

    addItinerary:async (req,res) => {
        const {name, userName, userPhoto, price, duration, hashtags, like, activities, idCity}=req.body.data
        let itinerary
        let error = null

        try{
            itinerary = await new Itinerary({
                name: name,
                userName: userName,
                userPhoto: userPhoto,
                price: price,
                duration: duration,
                hashtags: hashtags,
                like: like,
                activities: activities,
                idCity: idCity
            }).save()
        }catch(err){error = err}

        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itinerary = req.body.data
        let itineraryModified
        let error = null

        try {
            itineraryModified = await Itinerary.findOneAndUpdate({ _id:id}, itinerary, { new: true })
        } catch (err) {error = err}

        res.json({
            response: error ? 'ERROR' : itineraryModified,
            success: error ? false : true,
            error: error
        })
    },
    
    removeItinerary: async (req,res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itinerary.findOneAndDelete({_id: id})
        } catch (err) { error = err }
        
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error : error
        })
    },

    multiplesItinerary: async (req, res) => {
        let itinerary = []
        const data = req.body.data //almaceno en la constante data la informacion que le pedi al body
        let error = null

        try {
            data.map(async (item) => {
                await new Itinerary({
                    name: item.name,
                    userName: item.userName,
                    userPhoto: item.userPhoto,
                    price: item.price,
                    duration: item.duration,
                    hashtags: item.hashtags,
                    like: item.like,
                    activities: item.activities,
                    idCity: item.idCity

                }).save()
            })
        } catch (err) { error = err }
        city = await Itinerary.find()
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    getItineraryByIdCity: async (req,res) => {
        const id = req.params.id
        let itineraries
        let error = null
        
        try {
            itineraries = await Itinerary.find({ idCity : id }).populate('activities')
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    },

    likeAndDislikes: async (req, res) => {
        const id = req.params.id //LLEGA POR PARAMETRO DESDE AXIOS - id de la ciudad 
        //console.log(req.params.id)
        const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT - token de usuario
        //console.log(user)

        await Itinerary.findOne({ _id: id })

            .then((tinerary) => {
            
                if (tinerary.like.includes(user)) {
                    Itinerary.findOneAndUpdate({ _id: id }, { $pull: { like: user } }, { new: true })//PULL QUITA, SACA
                        .then((response) => res.json({ 
                                                        success: true, 
                                                        response: response.like,
                                                        message: "We sorry u don't like it anymore💔"
                                                    }))
                        .catch((error) => console.log(error))
                } else {
                    Itinerary.findOneAndUpdate({ _id: id }, { $push: { like: user } }, { new: true })//PUSH AGREGA
                        .then((response) => res.json({ 
                                                        success: true, 
                                                        response: response.like,
                                                        message:'Thank you for your like 💖'
                                                    }))
                        .catch((error) => console.log(error))
                }
            })
            .catch((error) => res.json({ success: false, response: error, error: error.message }))
    },

}

module.exports = itineraryControllers