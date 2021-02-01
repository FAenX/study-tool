import { ptfs0u, ptfs1u } from '../utils/variables'
import {api as apiT} from './table'
import {api as apiU} from './users'


export const postActiveTable=async (count: number)=>{
    try{
        const resp = await apiT.postActiveTable(count)
        console.log(resp)
    }catch(e){
        console.log(e)
    }
    

}

export const register=async (dispatch, user)=>{
    try{
        dispatch({type: 'SET_LOADER', state: {loading: true}})
        await apiU.register({...user})
        const log = await apiU.login(user.login, user.password)
        localStorage.setItem(ptfs0u, log.data.token)
        
        const u = await apiU.get()
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