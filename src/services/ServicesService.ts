import Service from "../core/models/Service"
import ServiceResponse from "../core/models/ServiceResponse"
import { findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";

export default {
  async index(attendance_id: number) {
    const result: ServiceResponse<Service> = {};

    try {
      result.data = await Facade.indexServices(attendance_id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async add(data: Service) {
    const result: ServiceResponse<Service> = {};

    try {
      result.data = await Facade.addService(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async update(data: Service) {
    const result: ServiceResponse<Service> = {};

    try {
      result.data = await Facade.updateService(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async delete(id: number) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.deleteService(id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
}