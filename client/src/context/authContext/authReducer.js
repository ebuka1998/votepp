import {
    REGISTER_USER,
    REGISTER_ERROR,
    LOGIN_USER,
    LOGIN_ERROR
}from '../types'

export default (state, action) => {
    switch(action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userInfo', JSON.stringify(action.payload.user))
            return {
                ...state,
                userAuth: true,
                errors: null
            }

        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                userAuth: null,
                errors: action.payload
            }

        default:
            return state
    }
}