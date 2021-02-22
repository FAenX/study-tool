import Axios from "axios";
import { userAuth } from "./auth";
import { ptfs1u } from "../utils/variables";


export const getRunningTable=()=> {   
    const id = localStorage.getItem(ptfs1u)
    return Axios.get(`/api/users/${id}/activetable`, userAuth());   
}

export const postActiveTable=(count: number)=>{   
    const id = localStorage.getItem(ptfs1u)
    return Axios.patch(`/api/users/${id}/activetable`, {count,}, userAuth());   
}

export const history=()=>{   
  const id = localStorage.getItem(ptfs1u)
  return Axios.get(`/api/users/${id}/activetables`, userAuth());   
}

