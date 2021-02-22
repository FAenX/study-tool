import { ptfs0u, ptfs1u } from '../utils/variables'
import {api as apiU} from './users'
import {getRunningTable, postActiveTable, history} from './table'

export async function login(dispatch: any, user: any){
    try{
        // loader
        dispatch({type: 'SET_LOADER', state: {loading: true}})
        const response = await apiU.login(user.login, user.password)
        console.log(response)
        localStorage.setItem(ptfs0u, response.data.token)

        const u = await apiU.get()
        
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

export async function getUser(dispatch: any ){
    try{
        dispatch({type: 'SET_LOADER', state: {loading: true}})
        const user = await apiU.get()
        dispatch({type: 'SET_LOADER', state: {loading: false}})
        dispatch({type: 'SET_LOGGED_IN_STATUS', state: {isloggedin: true}})
        console.log(user.data)
        localStorage.setItem(ptfs1u, user.data.id)
      }catch(e){
        dispatch({type: 'SET_LOADER', state: {loading: false}})
        dispatch({type: 'SET_LOGGED_IN_STATUS', state: {isloggedin: false}})
        dispatch({type: 'SET_COMPONENT', state: {component: 'login'}})
        localStorage.removeItem(ptfs1u)
      }
}

export async function getActiveTable(dispatch: any){
    try{
        const res = await getRunningTable()
        console.log(res.data)
        dispatch({type: 'SET_TABLE_DATA', state: {done: res.data.count, day: res.data.dayOfYear}})
        console.log(res.data.count)
    }catch(e){
        console.log(e.message)
    }
}


export async function getActiveTables(dispatch: any){
    try{
        const res = await history()
        console.log(res.data)
        dispatch({type: 'SET_HISTORY', state: res.data})
        console.log(res.data.count)
    }catch(e){
        console.log(e.message)
    }
}