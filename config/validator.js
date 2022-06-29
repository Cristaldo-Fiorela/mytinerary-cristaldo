const joi = require('joi') //exporto mi libreria joi

const validator = (req, res, next) => { //declaro mi const con los parametros q voy a utilizar

    const schema = joi.object({  // el metodo object genera un schema que coincide con un dato tipo objeto  (al igualq q strings JSON que fueron parceados a objetos)
        firstName: joi.string()
            .max(20)
            .min(2)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'name: min 2 characters',
                'string.max': 'name: max 20 characters'}),
        lastName: joi.string()
            .min(2)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': '"last name": min 2 characters',
                'string.max': '"last name": max 20 characters'}),

        country: joi.string()
                .trim(),
                //.required(),

        userPhoto: joi.string()
                .trim()
                .required(),

        email: joi.string() //prob en base a nuestro modelo? --- string: genera un esquema que coincide a un dato tipo string
        // declaramos los metodos a utilizar
            .email({minDomainSegments:2}) //requiere un string valido para el mail
            .required() //pide que cada una tenga su propia key - no permitira undefined como valor. las key son opcionales por default, aca la hacemos requerida
            .messages({ // mensajes a mostrar
                'string.email' : '"mail": incorrect formant' // ese : es un ternario ? parece uno....
                }),

        password: joi.string() //propiedad password a string
            .min(8) //min caracteres permitido
            //.max(20) //max caracteres permitido
            .pattern(new RegExp('[a-zA-Z0-9]')) //asigna un patron a seguir: FIXME: aparentemente se puede indicar los min y max aca dentro segun la docu https://joi.dev/api/?v=17.6.0
            .required() 
            .messages({
                'string.min' : '"password" : min 8 characters',
                // 'string.max' : '"password" : max 20 characters'
                }),

        from: joi.string() // from a string y requerida con una key
            .required()
    })


    const validation = schema.validate(req.body.userData, {abortEarly:false}) 
// utilizamos el metodo de validate() donde se le pasan de parametro los datos que provienen de nuestro frot
// abortEarly: false => se encarga de realizar las verificaciones y devolver una unica respuesta de array
// si este false se cambia a true devolvera una respuesta a la primera falta de validacion y no continua verificando

    if (validation.error) { //si hay un error en el validador
        return res.json({ 
            success: false, 
            from: 'validator', 
            message: validation.error.details,  // ARRAR DE ERRORES
            test: validation
        })
    }
    next() //luego de revisar los requerimientos del primer elemento, le indicamos que continue en el sgte
} 

// si todo se cumple, pasa a nuestros controladores ->


module.exports = validator



// EN CASO DE ERROR: pasos

// 1 -nos devuelve este mensaje json con el array de los errores 
// 2 -este array de errores va a  ser la respuesta de nuestro endPoint (actions) 
// 3 -se almacena en nuestra const res de nuestra action
// 4 =despachando los errores
// 5 -este despacho de actions se despacha en nuestro reducer
// 6 -guarda el error despachado en su type correspondiente (MESSAGE) dentro de la propiedad message 