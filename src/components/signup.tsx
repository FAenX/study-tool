import React from 'react'
import { ptfs0u, ptfs1u } from '../utils/variables'
import {api} from '../api/users'
import { connect } from 'react-redux'



function Signup({dispatch}){
    const [user, setUser] = React.useState({login: '', password: ''})

    const signup =async ()=>{
        try{
            dispatch({type: 'SET_LOADER', state: {loading: true}})
            await api.register({...user})
            const log = await api.login(user.login, user.password)
            localStorage.setItem(ptfs0u, log.data.token)

            
            const u = await api.get()
            
            console.log(u.data)
            localStorage.setItem(ptfs1u, u.data.id)


            dispatch({type: 'SET_LOADER', state: {loading: false}})
            dispatch({type: 'SET_LOGGED_IN_STATUS', state: {isloggedin: true}})


            dispatch({type: 'SET_COMPONENT', state: {component: null}})
            dispatch({type: 'SET_NOTIFICATION', state: {
                component: 'notify', 
                color: 'is-success', 
                message: 'Your have been logged in'
            }})
            setTimeout(()=>{
                dispatch({type: 'SET_NOTIFICATION', state: {component: null}})
            }, 5000)
            
        
        }catch(e){
            dispatch({type: 'SET_LOADER', state: {loading: false}})
            dispatch({type: 'SET_NOTIFICATION', state: {
                component: 'notify', 
                color: 'is-danger', 
                message: e.message}})
            setTimeout(()=>{
                dispatch({type: 'SET_NOTIFICATION', state: {
                    component: null
                }})
            }, 5000)
        }

        
        
        
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
                <div className="m-4 "> <a type="button" className="button is-rounded" onClick={signup}>register</a> </div>
                <div className="m-4"><a onClick={login}>login</a> </div>
            </div>
        </div>
    
    )
}

export default connect((state, dispatch)=>({state, dispatch}))(Signup)
