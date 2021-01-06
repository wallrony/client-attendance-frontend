import { AxiosResponse } from 'axios';

import AuthCredentials from "../../core/models/AuthCredentials";
import AuthorizedUser from "../../core/models/AuthorizedUser";
import Doctor from '../../core/models/Doctor';
import IDoctorsRepo from '../abstraction/IDoctorsRepo';
import { apiGet, apiPost, apiPut } from './api';

const DoctorsRepo: IDoctorsRepo = {
  async login(credentials: AuthCredentials) {
    let result: AxiosResponse<AuthorizedUser<Doctor>>;

    result = await apiPost('/api/accounts/login-doctor', credentials);

    return result.data;
  },
  async register(data: Doctor) {
    let result: AxiosResponse<boolean>;

    result = await apiPost('/api/accounts/register-doctor', data);

    return result.data;
  },
  async show(id: number) {
    let result: AxiosResponse<Doctor>;

    result = await apiGet(`/api/accounts/doctors/${id}`);

    return result.data;
  },
  async update(data: Doctor) {
    let result: AxiosResponse<Doctor>;

    result = await apiPut(`/api/accounts/doctors/${data.id}`, data);

    return result.data;
  }
}

export default DoctorsRepo;
