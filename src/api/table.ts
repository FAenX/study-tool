import Axios from "axios";
import { userAuth } from "./auth";
import { ptfs1u } from "../utils/variables";

export const api = {
  getRunningTable(): Promise<any> {   
      const id = localStorage.getItem(ptfs1u)
      return Axios.get(`/api/users/${id}/activetable`, userAuth());   
  },

  postActiveTable(count: number): Promise<any> {   
    const id = localStorage.getItem(ptfs1u)
    return Axios.patch(`/api/users/${id}/activetable`, {count,}, userAuth());   
},
};
