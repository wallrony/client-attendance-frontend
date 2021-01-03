import AuthCredentials from "../core/models/AuthCredentials";
import ServiceResponse from "../core/models/ServiceResponse";
import User from "../core/models/User";
import { findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";

export default {
  async login(credentials: AuthCredentials) {
    const result: ServiceResponse<User> = {};

    try {
      result.data = await Facade.login(credentials);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async register(data: User) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.register(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async show(id: number) {
    const result: ServiceResponse<User> = {};

    try {
      result.data = await Facade.showUser(id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async update(data: User) {
    const result: ServiceResponse<User> = {};

    try {
      result.data = await Facade.updateUser(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
}
