import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { api } from '../api/users'
import { userAuth } from '../api/auth'
import Signup from './signup'
import { ptfs0u, ptfs1u } from "../utils/variables";


function Login({dispatch, state}){

    const [user, setUser] = React.useState({login: '', password: ''})
    
    const signup=()=>{
        dispatch({type: 'SET_COMPONENT', state: {component: 'signup'}})
    }
    const change=(event: { preventDefault: () => void; target: { name: any; value: any } })=>{
        event.preventDefault()
        const name = event.target.name
        const userr = user
        userr[name] = event.target.value
        setUser(userr)
        
    }
    const login=async ()=>{
        
        try{
            // loader
            dispatch({type: 'SET_LOADER', state: {loading: true}})
            const response = await api.login(user.login, user.password)
            console.log(response)
            localStorage.setItem(ptfs0u, response.data.token)

            const u = await api.get()
            
            console.log(u.data)
            localStorage.setItem(ptfs1u, u.data.id)

            dispatch({type: 'SET_LOADER', state: {loading: false}})
            dispatch({type: 'SET_LOGGED_IN_STATUS', state: {isloggedin: true}})            
            // end loader
           
            dispatch({type: 'SET_COMPONENT', state: {component: null}})
            dispatch({type: 'SET_NOTIFICATION', state: {component: 'notify', color: 'is-success', message: 'Login successful'}})
            setTimeout(()=>{
                dispatch({type: 'SET_NOTIFICATION', state: {component: null}})
            }, 5000)
            
        }catch(e){
            dispatch({type: 'SET_LOADER', state: {loading: false}})
            dispatch({type: 'SET_NOTIFICATION', state: {component: 'notify', color: 'is-danger', message: e.message}})
            setTimeout(()=>{
                dispatch({type: 'SET_NOTIFICATION', state: {component: null}})
            }, 5000)
        }

    }
    return(
        
        <div id="login" className="container is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
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
                <div className="m-4"><a type="button" className="button is-rounded" onClick={login}>login</a></div>
                <div className="m-4" ><a onClick={signup}>register</a></div>
            </div>
            
        </div>
    
    )
}


export default connect((state, dispatch)=>({state, dispatch}))(Login)
