import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {getActiveTable, login as log} from '../api/queries'


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
        log(dispatch, user).then(res=>getActiveTable(dispatch)).catch(e=>e)
        
        

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
                <div className="m-4"><button type="button" className="button" onClick={login}>login</button></div>
                <div className="m-4" ><a onClick={signup}>register</a></div>
            </div>
            
        </div>
    
    )
}


export default connect((state, dispatch)=>({state, dispatch}))(Login)
