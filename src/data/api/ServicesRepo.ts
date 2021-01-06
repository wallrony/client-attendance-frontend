import { AxiosResponse } from 'axios';

import Service from '../../core/models/Service';
import IServicesRepo from '../abstraction/IServicesRepo';
import { apiDelete, apiGet, apiPost, apiPut } from "./api";

const ServicesRepo: IServicesRepo = {
  async index(attendance_id: number): Promise<Service[]> {
    let result: AxiosResponse<Service[]>;

    result = await apiGet(`/api/core/attendances/${attendance_id}/services`);

    return result.data;
  },
  async add(data: Service): Promise<Service> {
    let result: AxiosResponse<Service>;

    result = await apiPost(
      `/api/core/attendances/${data.attendance_id}/services`,
      data
    );

    return result.data;
  },
  async update(data: Service): Promise<Service> {
    let result: AxiosResponse<Service>;

    result = await apiPut(
      `/api/core/attendances/${data.attendance_id}/services/${data.id}`,
      data
    );

    return result.data;
  },
  async delete(attendance_id: number, id: number): Promise<boolean> {
    await apiDelete(`/api/core/attendances/${attendance_id}/services/${id}`);

    return true;
  },
}

export default ServicesRepo;
