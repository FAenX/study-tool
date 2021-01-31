import { ptfs1u } from '../utils/variables'
import {api as apiU} from './users'
import {api as apiT} from './table'

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
        const res = await apiT.getRunningTable()
        console.log(res.data)
        dispatch({type: 'SET_TABLE_DATA', state: {done: res.data.count}})
        console.log(res.data.count)
    }catch(e){
        console.log(e)
    }
}