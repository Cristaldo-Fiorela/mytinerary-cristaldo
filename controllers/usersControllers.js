const User = require('../models/user')
const bcryptjs = require('bcryptjs')


const userControllers = {

    // USUARIOS QUE SE REGISTRAN
    signUpUsers: async (req, res) => {
        let { firstName, lastName, email, password, from} = req.body.userData // DATOS SOLICITADOS DEL BODY DESDE FRONT
        const test = req.body.test // ? 

        try { // TRATA

            const userExists = await User.findOne({ email }) // Busca un objeto con el modelo email en nuestra base de datos y lo guarda en la const usuario Existe

            if (userExists) { // si usuario existe, osea, si encontro algo, nos metemos en el if anidado

                if (userExists.from.indexOf(from) !== -1) { // si aquello que existe tiene un indice diferente a -1 (los indices arrancan desde 0, el from es el meteodo con el que nos vamos a registrar, que es un array)
                    res.json({
                        success: false, //existe mail asi que falla al regitrar nuevo usuario con un mail ya registrado, por eso false
                        from: 'signup',
                        message: 'This email is already register, please Sign In'
                    })
                } else { //de lo contrario..... (seguimos dentro de la opciones de usuarios Existentes)

                    const hashedPassword = bcryptjs.hashSync( password, 10) //encryptamos la nueva contraseña creada con el nuevo metodo de registro (fb, google, sign) sin reemplazar la existente

                    userExists.from.push(from) //pusheo al modelo "from" el nuevo metodo de inicio del usuario
                    userExists.password.push(hashedPassword) // pusheo la nueva contra  a el array donde tenia las demas contras del usario
                    await userExists.save() //espera la respuesta de push y lo guarda
                    res.json({
                        success: true, 
                        from: 'signup', // FIXME:  nuestro signUp? Preguntar/ Google, FB, etc. -> metodos que no sean nuestro formulario
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
                    password: [hashedPassword], //recibe la const de arriba de la contra nueva
                    // uniqueString: crypto.randomBytes(15).toString('hex'),  FIXME: PREGUNTAR EN CLASE QUE ES ESTO
                    // verifiedEmail: false, FIXME: POR QUE AGREGAN COSAS QUE NO ESTAN EN EL MODELO? DONDE FIGURAN
                    from: [ from ] // FIXME: x que este esta encerrado con corchetes ?
                })
            
            // IF ANIDADO DE NUESTO ELSE QUE DICE Q NO EXISTE EL USUARIO

            if (from !== 'form-SignUp') {  //  si el metodo utilizado para crear el nuevo usuario es distinto a nuestro formulario, hago esto:
                await newUser.save() // evalua el metodo del nuevo usuario, cuando se cumpla. guardalo.
                res.json({
                    success: true,
                    from: 'signup',
                    message: 'Congratulations! User creation with ' + from + ' is completed'
                })
            } else { // si el metodo utilizado es el de nuestro formulario
                await newUser.save()
                res.json({
                    success: true,
                    from: 'signup',
                    message: 'We send you and email verification, please check your mailbox' //cambia la respuesta porque el metodo utilizado es diferente
                })
            }
            }
        } catch (error) { // atrapa el error
            res.json({ success: false, message: 'Something went wrong. Try again after a few minutes.'}) // devuelve este querido mensaje.
        }
    },


    signInUser: async(req, res) => {
        const { email, password, from} = req.body.loggedUser
        try{
            const userExists = await User.findOne({ email })
            //const indexpass = userExists.from.indexOf(from)
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
                            email: userExists.email,
                            from: from,
                        }
                        await userExists.save()
                        res.json({
                            success: true,
                            from: from,
                            response: { userData },
                            message: 'Welcome back ' + userData.firstName + ' ' + userData.lastName,
                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: 'You have not registered with ' + from + 'if you want to sign in with this method you must sign up with ' + from,
                        })
                    }
                } else {
                    // let samePassword = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                    if (samePassword.length > 0) {
                        const userData = {
                            id: userExists._id,
                            firstName: userExists.firstName,
                            lastName: userExists.lastName,
                            email: userExists.email,
                            from: from,
                        }
                        await userExists.save()
                        res.json({
                            success: true,
                            from: from,
                            response: { userData}, //token eliminado de pdf porque todavia no lo usamos
                            message: 'Welcome back ' + userData.firstName + userData.lastName,
                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: 'User name or password incorrect'
                        })
                    }
                }
            }
        } catch (error) {
            res.json({ success: false, messaje: 'Something went wrong. Try again after a few minutes.'})
        }
    },

}

module.exports = userControllers