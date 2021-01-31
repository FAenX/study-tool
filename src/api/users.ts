import Axios from "axios";
import { userAuth } from "./auth";
import { User } from "../models/user";
import {Session} from "./types"
import { ptfs0u } from "../utils/variables";

export const api = {
  login(login: String, password: String): Promise<any> {   
      return Axios.post(`/api/users/login`, { login, password });
  },

  register(user: {login: string, password: string}):Promise<any> {
      return Axios.post(`/api/users`, { ...user });
  },

  get():Promise<any> {
    return Axios.get(`/api/users`, userAuth());
  },

  updatePassword(currentPassword: String, newPassword: String) {
    return Axios.patch(
      `/api/users/change_password`,
      { currentPassword, newPassword },
      userAuth()
    );
  },

  resetPassword(newPassword: String) {
    return Axios.patch(
      `/api/user/reset_password`,
      { newPassword },
      userAuth()
    );
  },
};
