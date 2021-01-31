import {api} from './table'


export const postActiveTable=async (count: number)=>{
    try{
        const resp = await api.postActiveTable(count)
        console.log(resp)
    }catch(e){
        console.log(e)
    }
    

}