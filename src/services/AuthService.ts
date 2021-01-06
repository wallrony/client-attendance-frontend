import AuthCredentials from "../core/models/AuthCredentials";
import ServiceResponse from "../core/models/ServiceResponse";

interface AuthServicer<T, S> {
  login: (credentials: AuthCredentials) => Promise<ServiceResponse<S>>;
  register: (data: T) => Promise<ServiceResponse<boolean>>;
  show: (id: number) => Promise<ServiceResponse<T>>;
  update: (data: T) => Promise<ServiceResponse<T>>;
}

export default AuthServicer;
