const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const sendVerification = require('./sendVerification')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userControllers = {

    // USUARIOS QUE SE REGISTRAN
    signUpUsers: async (req, res) => {
        let { firstName, lastName, country, userPhoto, email, password, from} = req.body.userData 
        const test = req.body.test 

        try { 

            const userExists = await User.findOne({ email }) 
            const verification = false 
            const uniqueString = crypto.randomBytes(15).toString('hex') 

            if (userExists) {

                if (userExists.from.indexOf(from) !== -1) { 
                    res.json({
                        success: false, 
                        from: 'signup',
                        message: 'This email is already register, please Sign In'
                    })
                } else { 

                    const hashedPassword = bcryptjs.hashSync( password, 10) 
                    userExists.from.push(from) 
                    userExists.password.push(hashedPassword) 
                    userExists.verification = true

                    await userExists.save() 
                    res.json({
                        success: true, 
                        from: 'signup', 
                        message: "Added " + from + " at your options for sign in"
                    })
                }
            } else {
                const hashedPassword = bcryptjs.hashSync(password, 10)
                const newUser = await new User({ 
                    firstName,
                    lastName,
                    email, 
                    country,
                    userPhoto,
                    password: [hashedPassword],
                    uniqueString: uniqueString, 
                    verification,
                    from: [ from ] 
                })
            
                if (from !== 'form-SignUp') { 
                
                    newUser.verification = true 
                    await newUser.save()
                    res.json({
                        success: true,
                        from: 'signup',
                        message: 'Congratulations! User creation with ' + from + ' is completed'
                    })
                } else { 
                    await newUser.save()
                    await sendVerification(email, uniqueString)
                    res.json({
                        success: true,
                        from: 'signup',
                        message: 'We send you a email verification, please check your mailbox' 
                    })
                }
                }
        } catch (error) { // atrapa el error
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes.', error: error.message}) 
        }
    },


    signInUser: async(req, res) => {
        const { email, password, from} = req.body.loggedUser

        try{
            const userExists = await User.findOne({ email })
            if (!userExists) {
                res.json({ success: false, message: 'The entered user does not exist. Please signUp'})
            } else { 

                if (from !== 'form-SignUp') { 
                    let samePassword = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))

                    if (samePassword.length > 0) { 
                        const userData = {
                            id: userExists._id,
                            firstName: userExists.firstName,
                            lastName: userExists.lastName,
                            country: userExists.country,
                            userPhoto: userExists.userPhoto,
                            email: userExists.email,
                            from: from,
                        } 
                        
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24 }) //1h
                            await userExists.save()
                        res.json({
                            success: true,
                            from: from,
                            response: { token,userData },
                            message: 'Welcome back ' + userData.firstName,
                        })
                    } else { 
                        res.json({
                            success: false,
                            from: from,
                            message: 'You have not registered with ' + from + ' if you want to sign in with this method you must sign up with ' + from,
                        })
                    }
                } else { 
                    if (userExists.verification){ 

                    let samePassword = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))

                    if (samePassword.length > 0) {
                        const userData = {
                            id: userExists._id,
                            firstName: userExists.firstName,
                            lastName: userExists.lastName,
                            country: userExists.country,
                            userPhoto: userExists.userPhoto,
                            email: userExists.email,
                            from: from,
                        }
                        
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24 }) // 1h
                                                                                            // seg - min - dia
                            await userExists.save()
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData}, 
                            message: 'Welcome back ' + userData.firstName ,
                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: 'User name or password incorrect'
                        })
                    } 
                }
                else {
                    res.json({
                        success: false,
                        from: from,
                        message: "Please verified your mail"
                    })
                }
            }
            }
        } catch (error) {
            res.json({ success: false, messaje: 'Something went wrong. Try again after a few minutes.', error: error.message})
        }
    },

    verifyMail: async (req, res) => {
        const { string } = req.params
        const user = await User.findOne({uniqueString: string })
        //console.log(user)

        if (user) {
            user.verification = true
            await user.save()
            res.redirect('https://mytinerary-cristaldo.herokuapp.com/signin')
        }
        else { res.json({
            success: false,
            message: `email has not been confirmed yet!`
        })

        }
    },

    verifyToken:(req, res) => {
        //console.log(req.user)
        if (req.user) { // 
        res.json({
            success: true,
            response: {
                id: req.user.id,
                firstName:req.user.firstName,
                lastName: req.user.lastName,
                country: req.user.country,
                userPhoto:req.user.userPhoto,
                email:req.user.email,
                from:'token'},
                message:"Hi! Welcome back "+req.user.firstName
            }) 
        } else {
            res.json({
                success:false,
                message:"Sign in please!"}) 
        }
    },

    signOut: async (req, res) => {

        const email = req.body.closeUser
        const user = await User.findOne({ email })
        await user.save()
        
        res.json({
            success:true,
            message: "See you next time!"
        })
    },


}

module.exports = userControllers