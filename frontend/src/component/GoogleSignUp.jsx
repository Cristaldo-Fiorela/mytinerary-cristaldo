import React, { useEffect } from "react"
import jwt_decode from 'jwt-decode'
import { useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"

export default function GoogleSignUp() {
    const dispatch = useDispatch()


    async function handleCallbackResponse(response) {
        console.log(response.credential)
        
        let userObject = jwt_decode(response.credential)
        console.log(userObject)
        
        dispatch(usersActions.signUpUsers({
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            userPhoto: userObject.picture,
            email: userObject.email,
            password: userObject.jti,
            from: 'google'
        }))
    }


useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
        client_id: '825877478129-ji9qsrs31e9gl4e2eppqon4n5ide92o7.apps.googleusercontent.com',
        callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'medium'}
    )
});

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )

}