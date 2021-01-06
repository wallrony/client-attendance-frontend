import AuthCredentials from "../core/models/AuthCredentials";
import AuthorizedUser from "../core/models/AuthorizedUser";
import Doctor from "../core/models/Doctor";
import ServiceResponse from "../core/models/ServiceResponse";
import { findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";
import AuthServicer from "./AuthService";

export default {
  async login(credentials: AuthCredentials): Promise<ServiceResponse<AuthorizedUser<Doctor>>> {
    const result: ServiceResponse<AuthorizedUser<Doctor>> = {};

    try {
      result.data = await Facade.doctorLogin(credentials);
    } catch(e) {
      if(e.response && e.response.data['message'] === 'these credentials are invalid') {
        result.err = findErrorMessage('invalid-credentials');
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async register(data: Doctor) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.doctorRegister(data);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async show(id: number) {
    const result: ServiceResponse<Doctor> = {};

    try {
      result.data = await Facade.showDoctor(id);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async update(data: Doctor) {
    const result: ServiceResponse<Doctor> = {};

    try {
      result.data = await Facade.updateDoctor(data);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  }
} as AuthServicer<Doctor, AuthorizedUser<Doctor>>;
