import { AxiosResponse } from 'axios';

import Commission from "../../core/models/Commission"
import ICommissionsRepo from '../abstraction/ICommissionsRepo';
import { apiGet, apiPost } from "./api";

const CommissionsRepo: ICommissionsRepo = {
  async index(doctor_id: number): Promise<Commission[]> {
    let result: AxiosResponse<Commission[]>;

    result = await apiGet(`/api/core/doctor/${doctor_id}/commissions`);

    return result.data;
  },
  async add(data: Commission): Promise<Commission> {
    let result: AxiosResponse<Commission>;

    result = await apiPost(`/api/core/doctor/${data.doctor_id}/commissions`, data);

    return result.data;
  },
}

export default CommissionsRepo;
