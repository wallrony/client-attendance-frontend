import Model from "./Model";

interface ServiceResponse<T extends Model> {
  data?: T;
  err?: string;
}

export default ServiceResponse;
