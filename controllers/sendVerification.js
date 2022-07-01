const nodemailer = require('nodemailer') 
const { google } = require('googleapis') //desestructuro y me saco google de esete paquete que maneja las config de gmail que es google apis
const OAuth2 = google.auth.OAuth2

const sendVerification = async (email,string) => { //controlador

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    )
    
    myOAuth2Client.setCredentials({
        refresh_token:process.env.GOOGLE_REFRESH_TOKEN
    })

    const accessToken = myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            type: 'OAuth2',
            user: process.env.USER,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false //configuracion predeterminada que no rechaza la falta de verificacion
            // evita que lo bloquee el antivirus
        }
    })

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'verify account',
        html: 
            `
            <a href=http://localhost:4000/api/verify/${string}>Click!</a>
            <h3>to confirm!</h3>
            `
    }

    await transporter.sendMail(mailOptions, function (error, response){
        if (error) {
            console.log(error)
        } else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendVerification
