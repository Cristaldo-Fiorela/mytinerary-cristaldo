const Activity = require('../models/activities')

const activitiesControllers = { 


    getActivities: async (req, res) => {
    
        let activities 
        let error = null 
    
        try {
            activities = await Activity.find()
        } catch (err) {error = err} 
    
        res.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    },

    getOneActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null

        try {
            activity = await Activity.findOne({_id:id})
        } catch(err) {
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false: true,
            error: error
        })
    },

    addActivity:async (req,res) => {
        const {activitiesName, activitiesPhotos}=req.body.data
        let activity
        let error = null

        try{
            activity = await new Activity({
                activitiesName: activitiesName,
                activitiesPhotos: activitiesPhotos,
            }).save()
        }catch(err){error = err}

        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    
    modifyActivity: async (req, res) => {
        const id = req.params.id
        const activity = req.body.data
        let activityModified
        let error = null

        try {
            activityModified = await Activity.findOneAndUpdate({ _id:id}, activity, { new: true })
        } catch (err) {error = err}

        res.json({
            response: error ? 'ERROR' : activityModified,
            success: error ? false : true,
            error: error
        })
    },
    
    removeActivity: async (req,res) => {
        const id = req.params.id
        let activity
        let error = null

        try {
            activity = await Activity.findOneAndDelete({_id: id})
        } catch (err) { error = err }
        
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error : error
        })
    },

    multiplesActivities: async (req, res) => {
        let activity = []
        const data = req.body.data 
        let error = null

        try {
            data.map(async (item) => {
                await new Activity({
                    activitiesName: item.activitiesName,
                    activitiesPhotos: item.activitiesPhotos,
                }).save()
            })
        } catch (err) { error = err }
        activity = await Activity.find()
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },

    getActivityByIdTinerary: async (req,res) => {
        const id = req.params.id
        let activities
        let error = null
        
        try {
            activities = await Activity.find({ idTinerary : id }).populate('activities')
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activities,
            success: error ? false : true,
            error: error
        })
    },
    
}

module.exports = activitiesControllers