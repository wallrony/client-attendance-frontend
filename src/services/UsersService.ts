import AuthCredentials from "../core/models/AuthCredentials";
import AuthorizedUser from "../core/models/AuthorizedUser";
import ServiceResponse from "../core/models/ServiceResponse";
import User from "../core/models/User";
import { findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";
import AuthService from "./AuthService";

const UsersService: AuthService<User, AuthorizedUser<User>> = {
  async login(credentials: AuthCredentials): Promise<ServiceResponse<AuthorizedUser<User>>> {
    const result: ServiceResponse<AuthorizedUser<User>> = {};

    try {
      result.data = await Facade.login(credentials);
    } catch(e) {
      if(e.response && e.response.data['message'] === 'these credentials are invalid') {
        result.err = findErrorMessage('invalid-credentials');
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async register(data: User) {
    const result: ServiceResponse<boolean> = {};

    try {
      result.data = await Facade.register(data);
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
    const result: ServiceResponse<User> = {};

    try {
      result.data = await Facade.showUser(id);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async update(data: User) {
    const result: ServiceResponse<User> = {};

    try {
      result.data = await Facade.updateUser(data);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
}

export default UsersService;
