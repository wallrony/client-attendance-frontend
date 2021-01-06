import { AxiosResponse } from 'axios';

import UserAttendance from "../../core/models/UserAttendance"
import IUserAttendancesRepo from '../abstraction/IUserAttendancesRepo';
import { apiDelete, apiGet, apiPost, apiPut } from "./api";

const UserAttendancesRepo: IUserAttendancesRepo = {
  async indexAll(doctor_id: number): Promise<UserAttendance[]> {
    let result: AxiosResponse<UserAttendance[]>;

    result = await apiGet(`/api/core/user-attendances/${doctor_id}/all`);

    return result.data;
  },
  async index(user_id: number): Promise<UserAttendance[]> {
    let result: AxiosResponse<UserAttendance[]>;

    result = await apiGet(`/api/core/users/${user_id}/user-attendances`);

    return result.data;
  },
  async add(data: UserAttendance, services: number[]): Promise<UserAttendance> {
    let result: AxiosResponse<UserAttendance>;

    result = await apiPost(`/api/core/users/${data.user_id}/attendances/${data.attendance_id}/user-attendances`, {...data, services});

    return result.data;
  },
  async update(data: UserAttendance, services: number[]): Promise<UserAttendance> {
    let result: AxiosResponse<UserAttendance>;

    result = await apiPut(
      `/api/core/users/${data.user_id}/attendances/${data.attendance_id}/user-attendances/${data.id}`,
      { ...data, services }
    );

    return result.data;
  },
  async delete(id: number): Promise<boolean> {
    await apiDelete(`/api/core/user-attendances/${id}`);

    return true;
  },
}

export default UserAttendancesRepo;
