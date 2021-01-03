import Commission from "../../core/models/Commission";
import ICommissionsRepo from "../abstraction/ICommissionsRepo";

const list: Commission[] = [];

list.push({
  id: 1,
  client_attendance_id: 1,
  doctor_id: 1,
  value: 40,
});

list.push({
  id: 2,
  client_attendance_id: 2,
  doctor_id: 1,
  value: 48,
});

const CommissionMockRepo: ICommissionsRepo = {
  async index(doctor_id): Promise<Commission[]> {
    const result: Commission[] = [];

    for(const item of list) {
      if(item.doctor_id === doctor_id) {
        result.push(item)
      }
    }

    return result;
  },
  async add(data: Commission): Promise<Commission> {
    list.push(data);

    return data;
  }
}

export default CommissionMockRepo;
