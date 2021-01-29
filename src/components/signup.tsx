import React from 'react'
import ReactDOM from 'react-dom'
import {api} from '../api/users'


function Signup(){
    const [user, setUser] = React.useState({login: '', password: ''})
    const signup =async ()=>{
        try{
            const response = await api.register({...user})
            console.log(response)
            console.log(response.status)
        }catch(e){
            console.log(e.message)
        }
        
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
                <a type="button" className="button m-4 is-rounded" onClick={signup}>register</a>
            </div>
            
        </div>
    
    )
}

export default Signup
