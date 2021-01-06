import ServiceResponse from "../core/models/ServiceResponse";

interface Servicer<T> {
  index?: (...args: any[]) => Promise<ServiceResponse<T[]>>;
  show?: (...args: any[]) => Promise<ServiceResponse<T>>;
  add?: (...args: any[]) => Promise<ServiceResponse<T>>;
  update?: (...args: any[]) => Promise<ServiceResponse<T>>;
  delete?: (...args: any[]) => Promise<ServiceResponse<boolean>>;
}

export default Servicer;
