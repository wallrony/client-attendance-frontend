import Attendance from "../core/models/Attendance";
import ServiceResponse from "../core/models/ServiceResponse";
import Facade from "../data/Facade";

import { findErrorMessage } from '../core/utils/ResponseUtils';

export default {
  async index() {
    const result: ServiceResponse<Attendance> = {};

    try {
      result.data = await Facade.indexAttendances();
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async add(data: Attendance) {
    const result: ServiceResponse<Attendance> = {};

    try {
      result.data = await Facade.addAttendance(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async update(data: Attendance) {
    const result: ServiceResponse<Attendance> = {};

    try {
      result.data = await Facade.updateAttendance(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async delete(id: number) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.deleteAttendance(id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  }
}
