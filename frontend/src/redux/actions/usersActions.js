import axios from "axios";   //importamos axios porque vamos a fechear


const usersActions = {

    signUpUsers: (userData) => { //funcion
        console.log(userData)
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
            return res
        }
    },

    signInUser: (loggedUser) => {
        // console.log( loggedUser)
        return async (dispatch, getState) => {
            const res = await axios.post('http://localhost:4000/api/auth/signIn', {loggedUser})
            console.log(res)
            if(res.data.success) {
                localStorage.setItem('token', res.data.response.token)
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
            return res
        }
    },

    signOutUser: (closeUser) => {
          //console.log(closeData)
        return async (dispatch, getState) => {
            const res = axios.post('http://localhost:4000/api/auth/signOut',{closeUser})
            //console.log(res)
            localStorage.removeItem('token')
            dispatch({
                type: 'user',
                payload: null
            })
        }
    },


    verifyToken: (token) => {
        console.log(token)

        return async (dispatch, getState) => {
            await axios.get('http://localhost:4000/api/auth/signInToken', {
                headers: {'Authorization': 'Bearer ' + token}
            })
                .then(user => { if(user.data.success){
                    dispatch({ type: 'USER', payload: user.data.response});
                    dispatch({ 
                            type: 'MESSAGE',
                            payload: {view: true,
                            message: user.data.message,
                            success: user.data.success}
                });
                } else {localStorage.removeItem('token')}
                }
                ).catch(error => {
                    if(error.response.status === 401)
                        dispatch({type: 'MESSAGE',
                            payload: {view: true,
                            message: "Please, sign In Again",
                            success: false}})
                localStorage.removeItem('token')
                })
        }
    },

}

export default usersActions