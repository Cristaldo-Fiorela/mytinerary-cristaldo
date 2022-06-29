import axios from "axios";   //importamos axios porque vamos a fechear


const usersActions = {

    signUpUsers: (userData) => { //funcion
        console.log(userData)
        console.log(typeof userData.userPhoto)
        return async (dispatch, getState) => { //propiedades de despacho y estado
            const res = await axios.post('http://localhost:4000/api/auth/signUp', {userData})
            console.log(res)
            dispatch({
                type: 'MESSAGE', 
                payload:{ 
                    view: true, 
                    message: res.data.message, // SNACKBAR
                    success: res.data.success
                }})
        }
    },

    signInUser: (loggedUser) => {
        console.log( loggedUser)
        return async (dispatch, getState) => {
            const res = await axios.post('http://localhost:4000/api/auth/signIn', {loggedUser})
            console.log(res)
            if(res.data.success) {
                // localStorage.setItem('token', res.data.response.token)
                dispatch({
                    type: 'USER',
                    payload: res.data.response.userData
                })
            } else {
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            }
        }
    },

}

export default usersActions