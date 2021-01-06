import { AxiosResponse } from 'axios';

import Attendance from "../../core/models/Attendance"
import IAttendancesRepo from "../abstraction/IAttendancesRepo"
import { apiDelete, apiGet, apiPost, apiPut } from "./api";

const AttendancesRepo: IAttendancesRepo = {
  async index(): Promise<Attendance[]> {
    let result: AxiosResponse<Attendance[]>;

    result = await apiGet('/api/core/attendances');

    return result.data;
  },
  async add(data: Attendance): Promise<Attendance> {
    let result: AxiosResponse<Attendance>;

    result = await apiPost('/api/core/attendances', data);

    return result.data;
  },
  async update(data: Attendance): Promise<Attendance> {
    let result: AxiosResponse<Attendance>;

    result = await apiPut(`/api/core/attendances/${data.id}`, data);

    return result.data;
  },
  async delete(id: number): Promise<boolean> {
    await apiDelete(`/api/core/attendances/${id}`);

    return true;
  },
}

export default AttendancesRepo;
