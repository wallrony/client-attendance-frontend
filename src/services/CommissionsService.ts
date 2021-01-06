import Commission from "../core/models/Commission"
import ServiceResponse from "../core/models/ServiceResponse"
import { createError, findErrorMessage } from "../core/utils/ResponseUtils";
import Facade from "../data/Facade";
import StorageController from "../data/static/StorageController";

const CommissionsService = {
  async index() {
    const result: ServiceResponse<Commission[]> = {};

    try {
      const doctor_id = StorageController.getDoctorID();

      if(!doctor_id) {
        throw createError('user-not-encountered');
      }

      result.data = await Facade.indexCommissions(Number(doctor_id));
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  },
  async add(data: Commission) {
    const result: ServiceResponse<Commission> = {};

    try {
      result.data = await Facade.addCommission(data);
    } catch(e) {
      if(e.response) {
        result.err = findErrorMessage(e.response.status);
      } else {
        result.err = findErrorMessage(e);
      }
    }

    return result;
  }
};

export default CommissionsService;
