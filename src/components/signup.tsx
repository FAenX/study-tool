import React from 'react'
import { ptfs0u, ptfs1u } from '../utils/variables'
import { connect } from 'react-redux'
import {register} from '../api/mutations'
import { getActiveTable } from '../api/queries'



function Signup({dispatch}){
    const [user, setUser] = React.useState({login: '', password: ''})

    const signup =async ()=>{
        register(dispatch, user).then(res=>getActiveTable(dispatch)).catch(e=>e)
    }

    const login=()=>{
        dispatch({type: 'SET_COMPONENT', state: {component: 'login'}})
    }

    const change=(event: { preventDefault: () => void; target: { name: any; value: any } })=>{
        event.preventDefault()
        const name = event.target.name
        const userr = user
        userr[name] = event.target.value
        setUser(userr)
        
    }
    
    return(
        
        <div id="login" className="container is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
            <div className="p-4">Signup</div>
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
                <div className="m-4 "> <a type="button" className="button" onClick={signup}>register</a> </div>
                <div className="m-4"><a onClick={login}>login</a> </div>
            </div>
        </div>
    
    )
}

export default connect((state, dispatch)=>({state, dispatch}))(Signup)
