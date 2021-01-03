import AuthCredentials from "../core/models/AuthCredentials";
import Doctor from "../core/models/Doctor";
import ServiceResponse from "../core/models/ServiceResponse";
import { findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";

export default {
  async login(credentials: AuthCredentials) {
    const result: ServiceResponse<Doctor> = {};

    try {
      result.data = await Facade.doctorLogin(credentials);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async register(data: Doctor) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.doctorRegister(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async show(id: number) {
    const result: ServiceResponse<Doctor> = {};

    try {
      result.data = await Facade.showDoctor(id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async update(data: Doctor) {
    const result: ServiceResponse<Doctor> = {};

    try {
      result.data = await Facade.updateDoctor(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  }
}