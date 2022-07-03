import React, { useEffect } from "react"

import jwt_decode from 'jwt-decode'
import { useDispatch } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function GoogleSignUp() {
    const dispatch = useDispatch()


    async function handleCallbackResponse(response) {
        //console.log(response.credential)
        
        let userObject = jwt_decode(response.credential)
        //console.log(userObject)
        
        const res = await dispatch(usersActions.signUpUsers({
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            userPhoto: userObject.picture,
            email: userObject.email,
            password: userObject.sub,
            from: 'google'
        }))
        //console.log(res)

        if (res.data.from === 'signup')
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }


useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
        //process.env.CLIENT_ID,
        client_id: '825877478129-ji9qsrs31e9gl4e2eppqon4n5ide92o7.apps.googleusercontent.com',
        context: 'signup', 
        callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        {  size: 'medium', theme: "filled_black", shape: "pill", locale:"EN", text:"signup_with" }
    )
    // eslint-disable-next-line
},[]);

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )

}