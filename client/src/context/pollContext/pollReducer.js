import {
    CREATE_POLLS,
    CREATE_POLLS_ERROR,
    GET_POLLS,
    GET_POLLS_ERRROR,
    GET_POLL,
    GET_POLL_ERRROR,
    VOTE_POLL,
    VOTE_POLL_ERRROR
}from '../types'

export default (state, action) => {
    switch(action.type) {
        case CREATE_POLLS:
            return{
                ...state,
                create: action.payload,
                errors: null
            }
        case GET_POLLS:
            return {
                ...state,
                polls: action.payload,
                errors: null
            }

        case GET_POLL:
            return {
                ...state,
                poll: action.payload,
                errors: null
            }
            
        case VOTE_POLL:
            return {
                ...state,
                voted: action.payload,
                errors: null
            }

        case GET_POLLS_ERRROR:
        case GET_POLL_ERRROR:
        case VOTE_POLL_ERRROR:
        case CREATE_POLLS_ERROR:
            return {
                ...state,
                errors: action.payload
            }

        default:
            return state
    }
}