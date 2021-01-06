import { AxiosResponse } from 'axios';

import AuthCredentials from "../../core/models/AuthCredentials";
import AuthorizedUser from "../../core/models/AuthorizedUser";
import User from '../../core/models/User';
import IUsersRepo from "../abstraction/IUsersRepo";
import { apiGet, apiPost, apiPut } from './api';

const UsersRepo: IUsersRepo = {
  async login(credentials: AuthCredentials) {
    let result: AxiosResponse<AuthorizedUser>;

    result = await apiPost('/api/accounts/login', credentials);

    return result.data;
  },
  async register(data: User) {
    let result: AxiosResponse<boolean>;

    result = await apiPost('/api/accounts/register', data);

    return result.data;
  },
  async show(id: number) {
    let result: AxiosResponse<User>;

    result = await apiGet(`/api/accounts/users/${id}`);

    return result.data;
  },
  async update(data: User) {
    let result: AxiosResponse<User>;

    result = await apiPut(`/api/accounts/users/${data.id}`, data);

    return result.data;
  }
}

export default UsersRepo;