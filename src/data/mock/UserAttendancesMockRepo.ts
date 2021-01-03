import Service from "../../core/models/Service";
import UserAttendance from "../../core/models/UserAttendance";
import IUserAttendancesRepo from "../abstraction/IUserAttendancesMockRepo";
import ServicesMockRepo from "./ServicesMockRepo";

const list: UserAttendance[] = [];

list.push({
  "id": 5,
  "user_id": 2,
  "attendance_id": 1,
  "date": "2020-01-03T16:30:00.000Z",
  "services": [
    {
      "name": "Exame de Grau",
      "id": 2,
      "price": 150.00,
      "duration": 600.00
    }
  ]
});

list.push({
  "id": 7,
  "user_id": 2,
  "attendance_id": 2,
  "date": "2020-01-03T16:30:00.000Z",
  "services": [
    {
      "name": "Clareamento Dentário",
      "id": 3,
      "price": 60.00,
      "duration": 600.00
    },
    {
      "name": "Extração",
      "id": 4,
      "price": 50.00,
      "duration": 600.00
    }
  ]
});

const UserAttendancesMockRepo: IUserAttendancesRepo = {
  async index(user_id: number): Promise<UserAttendance[]> {
    const result: UserAttendance[] = [];

    for(const item of list) {
      if(item.user_id === user_id) {
        result.push(item);
      }
    }

    return result;
  },
  async add(data: UserAttendance, services: number[]): Promise<UserAttendance> {
    const offResult: Service[] = [];

    for(let i = 0 ; i < services.length; i++) {
      const service_id = services[i];

      offResult.push((await ServicesMockRepo.show(service_id)));
    }

    data.services = offResult;

    list.push(data);

    return data;
  },
  async update(data: UserAttendance, services: number[]): Promise<UserAttendance> {
    let result: UserAttendance | undefined;
    
    const offResult: Service[] = [];

    for(let i = 0 ; i < services.length; i++) {
      const service_id = services[i];

      offResult.push((await ServicesMockRepo.show(service_id)));
    }

    data.services = offResult;

    for(let i = 0 ; i < list.length; i++) {
      const item = list[i];

      if(item.id === data.id) {
        list[i] = {
          ...item,
          ...data
        }
        result = list[i];

        break;
      }
    }

    if(!result) {
      throw('service-not-encountered');
    }

    return result;
  },
  async delete(id: number): Promise<boolean> {
    for(let i = 0 ; i < list.length; i++) {
      const item = list[i];

      if(item.id === id) {
        delete list[i];

        break;
      }
    }

    return true;
  }
}

export default UserAttendancesMockRepo;
