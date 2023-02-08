import axios from "axios";   


const usersActions = {

    signUpUsers: (userData) => { 
        return async (dispatch, getState) => { 
            const res = await axios.post('https://mytinerary-back-cristaldo.herokuapp.com/api/auth/signUp', {userData})
            dispatch({
                type: 'MESSAGE', 
                payload:{ 
                    view: true, 
                    message: res.data.message, 
                    success: res.data.success
                }})
            return res
        }
    },

    signInUser: (loggedUser) => {
        return async (dispatch, getState) => {
            const res = await axios.post('https://mytinerary-back-cristaldo.herokuapp.com/api/auth/signIn', {loggedUser})
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
        return async (dispatch, getState) => {
            await axios.post('https://mytinerary-back-cristaldo.herokuapp.com/api/auth/signOut',{closeUser})
            localStorage.removeItem('token')
            dispatch({
                type: 'USER',
                payload: null
            })
        }
    },


    verifyToken: (token) => {

        return async (dispatch, getState) => {
            await axios.get('https://mytinerary-back-cristaldo.herokuapp.com/api/auth/signInToken', {
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