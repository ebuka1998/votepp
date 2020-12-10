import React, {useState, useContext} from 'react'
import './css/login.css'
import AuthContext from '../context/authContext/authContext';

const Login = (props) => {
    const {loginUser} = useContext(AuthContext)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const {email, password} = user

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onLogin = (e) => {
        e.preventDefault()
        loginUser({email, password})
        props.history.push('/')
        setUser({
            user: ''
        })
       
    }
    return (
        <div className="login-box">
            <h2>Login</h2>
            <form>
                <div className="user-box">
                    <input type="email" name="email" value={email}  onChange={handleChange}/>
                    <label>email</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password" value={password} onChange={handleChange} />
                    <label>Password</label>
                </div>
                <a  onClick={onLogin}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                </a>
            </form>
        </div>
    )
}

export default Login
