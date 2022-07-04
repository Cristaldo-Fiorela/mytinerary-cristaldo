const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const sendVerification = require('./sendVerification')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userControllers = {

    // USUARIOS QUE SE REGISTRAN
    signUpUsers: async (req, res) => {
        let { firstName, lastName, country, userPhoto, email, password, from} = req.body.userData // DATOS SOLICITADOS DEL BODY DESDE FRONT
        const test = req.body.test // ? 

        try { // TRATA

            const userExists = await User.findOne({ email }) // Busca un objeto con el modelo email en nuestra base de datos y lo guarda en la const usuario Existe
            const verification = false // falso por default
            const uniqueString = crypto.randomBytes(15).toString('hex') // utilizo los metodos de crypto

            if (userExists) { // si usuario existe, osea, si encontro algo, nos metemos en el if anidado

                if (userExists.from.indexOf(from) !== -1) { // si aquello que existe tiene un indice diferente a -1 (los indices arrancan desde 0, el from es el meteodo con el que nos vamos a registrar, que es un array)
                    
                    res.json({
                        success: false, //existe mail asi que falla al regitrar nuevo usuario con un mail ya registrado, por eso false
                        from: 'signup',
                        message: 'This email is already register, please Sign In'
                    })
                } else { //de lo contrario..... (seguimos dentro de la opciones de usuarios Existentes) si existe pero no se registro con ese metodo

                    const hashedPassword = bcryptjs.hashSync( password, 10) //encryptamos la nueva contraseña creada con el nuevo metodo de registro (fb, google, sign) sin reemplazar la existente
                    userExists.from.push(from) //pusheo al modelo "from" el nuevo metodo de inicio del usuario
                    userExists.password.push(hashedPassword) // pusheo la nueva contra  a el array donde tenia las demas contras del usario
                    userExists.verification = true

                    await userExists.save() //espera la respuesta de push y lo guarda
                    res.json({
                        success: true, 
                        from: 'signup', // Google, FB, etc. -> metodos que no sean nuestro formulario
                        message: "Added " + from + " at your options for sign in"
                    })
                }
            // SALIMOS DEL PRIMER IF =  USUARIO NO EXISTE -> TENEMOS QUE REGISTRARLO DE 0
            } else {
                const hashedPassword = bcryptjs.hashSync(password, 10) // se encripta la nueva contra
                const newUser = await new User({ //
                    firstName,
                    lastName,
                    email, 
                    country,
                    userPhoto,
                    password: [hashedPassword], //recibe la const de arriba de la contra nueva
                    uniqueString: uniqueString, 
                    verification,
                    from: [ from ] 
                })
            
            // IF ANIDADO DE NUESTO ELSE QUE DICE Q NO EXISTE EL USUARIO

                if (from !== 'form-SignUp') {  //  si el metodo utilizado para crear el nuevo usuario es distinto a nuestro formulario, hago esto:
                
                    newUser.verification = true // le estamos diciendo que no es necesario q valide los datos de metodos de registro diferente a nuestro form
                
                    await newUser.save() // evalua el metodo del nuevo usuario, cuando se cumpla. guardalo.
                    res.json({
                        success: true,
                        from: 'signup',
                        message: 'Congratulations! User creation with ' + from + ' is completed'
                    })
                } else { // si el metodo utilizado es el de nuestro formulario
                    await newUser.save()
                    await sendVerification(email, uniqueString)
                    res.json({
                        success: true,
                        from: 'signup',
                        message: 'We send you a email verification, please check your mailbox' //cambia la respuesta porque el metodo utilizado es diferente
                    })
                }
                }
        } catch (error) { // atrapa el error
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes.', error: error.message}) // devuelve este querido mensaje.
        }
    },


    signInUser: async(req, res) => {
        const { email, password, from} = req.body.loggedUser

        try{
            const userExists = await User.findOne({ email })
            //const indexpass = userExists.from.indexOf(from)
            if (!userExists) { // usuario no existe
                res.json({ success: false, message: 'The entered user does not exist. Please signUp'})
            } else { //existe

                if (from !== 'form-SignUp') { // se logea de un metodo distinto de nuestro form
                    let samePassword = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))

                    if (samePassword.length > 0) { // length NO ES index. comienza desde el 1, el index comienza desde el 0
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
                    } else { // existe usuario (mail) pero no esta registrando el metodo nuevo
                        res.json({
                            success: false,
                            from: from,
                            message: 'You have not registered with ' + from + ' if you want to sign in with this method you must sign up with ' + from,
                        })
                    }
                } else { //si encuentra mail del metodo de nuestro form
                    if (userExists.verification){ //si el usuario esta VERIFICADO

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
            res.redirect('http://localhost:3000')
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