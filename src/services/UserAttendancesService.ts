import ServiceResponse from "../core/models/ServiceResponse"
import UserAttendance from "../core/models/UserAttendance"
import { createError, findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";
import StorageController from "../data/static/StorageController";

const UserAttendancesService = {
  async indexAll() {
    const result: ServiceResponse<UserAttendance[]> = {};

    try {
      const doctor_id = StorageController.getDoctorID();

      if(!doctor_id) {
        throw createError('user-not-encountered')
      }

      result.data = await Facade.indexAllUserAttendances(doctor_id);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async index(user_id: number) {
    const result: ServiceResponse<UserAttendance[]> = {};

    try {
      result.data = await Facade.indexUserAttendances(user_id);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async add(data: UserAttendance, services: number[]) {
    const result: ServiceResponse<UserAttendance> = {};

    try {
      result.data = await Facade.addUserAttendance(data, services);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async update(data: UserAttendance, services: number[]) {
    const result: ServiceResponse<UserAttendance> = {};

    try {
      result.data = await Facade.updateUserAttendance(data, services);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async delete(id: number) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.deleteUserAttendance(id);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
};

export default UserAttendancesService;
