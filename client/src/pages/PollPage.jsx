import React, {useContext, useEffect} from 'react'
import AuthContext from '../context/authContext/authContext';
import PollContext from '../context/pollContext/pollContext';
import { Pie } from 'react-chartjs-2';
import './css/poll.css'
import { color } from '../utils/color'

const PollPage = (props) => {

    const {user} = useContext(AuthContext)
    const {poll, getPoll, vote, voted} = useContext(PollContext)

    const id = props.match.params.id

    const userId = user && user

    useEffect(() => {
        getPoll(id)
    }, [voted]) 

    const answers = 
        poll.options &&
        poll.options.map(option => (
            <div className='polldiv' key={option._id}>
                <button
                    onClick={() => vote(poll._id, { answer: option.option, userId })}
                    className= 'button'
                    >
                        <div style={{display:'flex', justifyContent: 'space-between'}}>
                            <h2>{option.option}</h2>
                            <h3>{(option.votes/poll.voted.length * 100).toFixed(0)}%</h3>   
                        </div>
                </button>
            </div>
        ));


    const data = {
       labels: poll.options && poll.options.map(option => option.option),
        datasets: [
            {
                label: poll && poll.question,
                backgroundColor: poll.options && poll.options.map(option => color()),
                borderColor: '#323643',
                data: poll.options && poll.options.map(option => option.votes),
            },
        ] 
    }

    return (
        <div style={{margin: 'auto', width: '500px', paddingTop: '200px'}}>
            <h2 style={{textAlign: 'center'}}> {poll && poll.question}</h2>
            {answers}
            <p style={{textAlign: 'center'}}>
                vote by clicking on a button, you can't vote twice
            </p>
            <div></div>
            <div>
                <Pie data={data}/>
            </div>
        </div>
    )
}

export default PollPage
