import React, {useReducer} from 'react'
import AuthContext from './authContext';
import authReducer from './authReducer'

//also import the types
import {
    REGISTER_USER, 
    REGISTER_ERROR,
    LOGIN_USER, 
    LOGIN_ERROR
}from '../types'


import axios from 'axios'

const AuthState = (props) => {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || null

    const initialState = {
        //Auth state goes in here 
        authState: null,
        user: userInfo,
        errors: null  
    }

    const [state, dispatch] = useReducer(authReducer, initialState)


    //functions goes in here
    const registerUser = async(userData) => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/createUser', userData)
            dispatch({
                type: REGISTER_USER,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.message
            })
        }
    }

    const loginUser = async(userData) => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/loginUser', userData)
            dispatch({
                type: LOGIN_USER,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.message
            })
        }
    }






    return (
        <AuthContext.Provider
            //state that are accessible and functions goes in here
            value = {{

                userAuth: state.userAuth,
                user: state.user,

                registerUser,
                loginUser
            }}
            
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState