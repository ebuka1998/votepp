import React, {useState, useContext} from 'react'
import PollContext from '../context/pollContext/pollContext';

const CreatePage = () => {
    const {createPoll} = useContext(PollContext)

    const [question, setQuestion] = useState('')
    const [option, setOption] = useState('')
    const [options, setOptions] = useState([])
    //const options = []

    const handleQuestion = (e) => {
        setQuestion(e.target.value)
    }

    const handleOption = (e) => {
        setOption(e.target.value)
    }

    const addOption = () => {
        if(option === '') {
            alert('please provide an option')
        }else{
            setOptions([
                ...options,
                option
            ])
            setOption('')
        }
    }

    const submitPoll = () => {
        if(options.length <= 1) {
            alert('options cannot be one or less')
        }else{
            createPoll({question, options});
            setQuestion('')
            setOptions([])
        }
    }



    return (
        <div style={{margin: 'auto', width: '500px'}}>
            <h1 style={{padding: '20px', textAlign: 'center'}}>create poll</h1>
            <input 
                type="text" 
                style={{width: '100%', padding: '10px', marginTop: '100px',}}
                value={question}
                placeholder='add question'
                onChange={handleQuestion}
            />
            <br/> <br/>
            <input 
                type="text"  
                style={{width: '100%', padding: '10px'}}
                onChange = {handleOption}
                value = {option}
                placeholder = 'add options'
            />
            <br/> <br/>
            <button style={{padding: '10px', backgroundColor: 'blue', width: '100%'}} onClick={addOption}>
                add option
            </button>
            <ul style={{display: 'block'}}>
                {options.map((xo, i) => (
                    <li style={{listStyle: 'none', padding: '5px'}} key={i}>{xo}</li>
                ))}
            </ul>
            <button style={{padding: '10px', backgroundColor: 'green', width: '100%'}} onClick={submitPoll}>
                submit poll
            </button>
        </div>
    )
}

export default CreatePage
