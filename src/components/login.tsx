import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { api } from '../api/users'
import { userAuth } from '../api/auth'
import Signup from './signup'
import { ptfs0u } from "../utils/variables";


function Login({dispatch, state}){

    const [user, setUser] = React.useState({login: '', password: ''})
    
    const signup=()=>{
        dispatch({type: 'SET_COMPONENT', state: {component: <Signup/>}})
    }
    const change=(event: { preventDefault: () => void; target: { name: any; value: any } })=>{
        event.preventDefault()
        const name = event.target.name
        const userr = user
        userr[name] = event.target.value
        setUser(userr)
        
    }
    const login=async ()=>{
        const response = await api.login(user.login, user.password)
        console.log(response.data)
        if(response.data){
            localStorage.setItem(ptfs0u, response.data.token)
        }

    }
    return(
        
        <div id="login" style={{width: "30vw"}} className="container is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
            <div className="p-4">Login</div>
            <div className="field">
                <div className="control m-2">
                    <input onChange={change} className="input is-primary" type="email" placeholder="email" name="login"/>
                </div>
            </div>
            <div className="field">
                <div className="control m-2">
                    <input onChange={change} className="input is-primary" type="password" placeholder="password" name="password"/>
                </div>                
            </div>
            <div>
                <a type="button" className="button m-4 is-rounded" onClick={login}>login</a>
                <a type="button" className="button m-4 is-rounded" onClick={signup}>register</a>
            </div>
            
        </div>
    
    )
}


export default connect((state, dispatch)=>({state, dispatch}))(Login)
