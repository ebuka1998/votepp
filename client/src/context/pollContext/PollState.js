import React, {useReducer} from 'react'
import PollContext from './pollContext';
import pollReducer from './pollReducer'

//also import the types
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

import axios from 'axios'

const PollState = (props) => {
    
    const initialState = {
        //poll state goes in here 
        create: null,
        polls: [],
        poll: {},
        errors: null,
        voted: false
    }

    const [state, dispatch] = useReducer(pollReducer, initialState)


    //functions goes in here
    const createPoll = async (dataToSubmit) => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/createPoll', dataToSubmit)
            dispatch({
                type: CREATE_POLLS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: CREATE_POLLS_ERROR,
                payload: error.message
            })
        }
    }
    const getPolls = async() => {
        try {
            const {data} = await axios.get('http://localhost:5000/api/getPolls')
            dispatch({
                type: GET_POLLS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: GET_POLLS_ERRROR,
                payload: error.message
            })
        }
    }

    const getPoll = async(id) => {
        try {
            const {data} = await axios.get(`http://localhost:5000/api/getPolls/${id}`)
            dispatch({
                type: GET_POLL,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: GET_POLL_ERRROR,
                payload: error.message
            })
        }
    }

    const vote = async(id, datavote) => {
        try {
            const {data} = await axios.post(`http://localhost:5000/api/votepoll/${id}`, datavote)
            console.log(data)
            dispatch({
                type: VOTE_POLL,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: VOTE_POLL_ERRROR,
                payload: error.message
            })
        }
    }


    /** functions */
    return (
        <PollContext.Provider
            //state that are accessible and functions goes in here
            value = {{
                polls: state.polls,
                poll: state.poll,
                voted: state.voted,
                
                getPoll,
                getPolls,
                vote,
                createPoll
            }}
            
        >
            {props.children}
        </PollContext.Provider>
    )
}

export default PollState