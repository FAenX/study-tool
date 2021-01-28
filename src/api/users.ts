import Axios from "axios";
import { userAuth } from "./auth";
import { User } from "../models/user";
import {Session} from "./types"

export const api = {
  login(login: String, password: String): Promise<any> {   
      return Axios.post(`/api/users/login`, { login, password });   
  },

  register(user: User) {
    return Axios.post(`/api/users`, { ...user });
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
