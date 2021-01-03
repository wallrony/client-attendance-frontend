import ServiceResponse from "../core/models/ServiceResponse"
import UserAttendance from "../core/models/UserAttendance"
import { findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";

export default {
  async index(user_id: number) {
    const result: ServiceResponse<UserAttendance> = {};

    try {
      result.data = await Facade.indexUserAttendances(user_id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async add(data: UserAttendance, services: number[]) {
    const result: ServiceResponse<UserAttendance> = {};

    try {
      result.data = await Facade.addUserAttendance(data, services);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async update(data: UserAttendance, services: number[]) {
    const result: ServiceResponse<UserAttendance> = {};

    try {
      result.data = await Facade.updateUserAttendance(data, services);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async delete(id: number) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.deleteUserAttendance(id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
}
