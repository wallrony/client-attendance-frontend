import Model from "./Model";

interface ServiceResponse<T extends Model> {
  data?: T | T[];
  err?: string;
}

export default ServiceResponse;
