//REACT
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import jwt_decode from 'jwt-decode'

// LIBRARY
import { toast } from 'react-toastify';

//ACTIONS
import usersActions from "../redux/actions/usersActions"

//STYLES
import 'react-toastify/dist/ReactToastify.css';

export default function GoogleSignIn() {
    const dispatch = useDispatch()


    async function handleCallbackResponse(response) {

        let userObject = jwt_decode(response.credential)
        const res = await dispatch(usersActions.signInUser({
            email: userObject.email,
            password: userObject.sub,
            from: 'google'
        }))

        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }


useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
        client_id: '825877478129-ji9qsrs31e9gl4e2eppqon4n5ide92o7.apps.googleusercontent.com',
        context: 'signin',
        callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        {  size: 'medium', theme: "filled_black", shape: "pill", locale:"EN", text:"signin_with"}
    )
    // eslint-disable-next-line
},[]);

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )

}