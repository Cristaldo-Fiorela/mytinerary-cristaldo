const Itinerary = require('../models/itinerarys')

const commentsControllers = {

    addComment: async (req, res) => {
        
        const { tinerary, comment } = req.body.comment //LLEGA POR AXIOS - body de postman y de la estructura de mis comments
        const user = req.user._id //LLEGA POR PASSPORT - token
        
        try {
            const newComment = await Itinerary
                .findOneAndUpdate({_id:tinerary}, 
                                    {$push: {comments: 
                                                { userId: user,
                                                comment: comment}
                                            }}, {new: true})
                .populate("comments.userId", {firstName: 1, lastName: 1, userPhoto:1})
            res.json({ success: true, response:{newComment}, message:'Thank you for your comment!' })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes.', error: error.message })
        }

    },

    modifyComment: async (req, res) => {
        const {commentId,comment} = req.body
        const user = req.user._id

        try {
            const modifiedComment = await Itinerary
                .findOneAndUpdate({"comments._id":commentId}, {$set: {"comments.$.comment": comment }}, {new: true})
            console.log(modifiedComment)
            res.json({ success: true, response:{modifiedComment}, message:'Your comment has been modified' })
        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message:'Something went wrong. Try again after a few minutes.', error: error.message })
        }
    },

    removeComment: async (req, res) => {

        const id = req.params.id
        const user = req.user._id

        try {
            const removeComment = await Itinerary.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
            res.json({ success: true, response:{removeComment}, message: 'Your comment has been deleted' })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes.', error: error.message })
        }

    },
    
}
module.exports = commentsControllers