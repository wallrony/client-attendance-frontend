import Commission from "../core/models/Commission"
import ServiceResponse from "../core/models/ServiceResponse"
import { findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";

export default {
  async index(doctor_id: number) {
    const result: ServiceResponse<Commission> = {};

    try {
      result.data = await Facade.indexCommissions(doctor_id);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  },
  async add(data: Commission) {
    const result: ServiceResponse<Commission> = {};

    try {
      result.data = await Facade.addCommission(data);
    } catch(e) {
      result.err = findErrorMessage(e);
    }

    return result;
  }
}