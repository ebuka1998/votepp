import React, {useContext, useEffect} from 'react'
import AuthContext from '../context/authContext/authContext';
import PollContext from '../context/pollContext/pollContext';
import {Link} from 'react-router-dom'

import './css/home.css'


const HomePage = () => {
    const {user} = useContext(AuthContext)
    const {polls, getPolls} = useContext(PollContext)
    
    useEffect(() => {
        getPolls()
    })

    return (
        <div>
           <h1 style={{color: 'black'}}>{user.email}</h1>

           <div>
               {polls && polls.map((poll, i) => (
                  <div className='homediv' key={i}>
                    <h2>
                        <Link to = {`poll/${poll._id}`} className='link'>{poll.question}</Link>
                    </h2>
                  </div>
               ))}
           </div>
        </div>
    )
}

export default HomePage
