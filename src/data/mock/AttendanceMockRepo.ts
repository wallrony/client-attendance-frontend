import { isUnionTypeNode } from "typescript";
import Attendance from "../../core/models/Attendance";
import IAttendancesRepo from "../abstraction/IAttendancesRepo";

const list: Attendance[] = [];

list.push({
  id: 1,
  title: 'Consulta de Vista'
});

list.push({
  id: 2,
  title: 'Revisão Dentária'
});

const AttendanceMockRepo: IAttendancesRepo = {
  async index(): Promise<Attendance[]> {
    return list;
  },
  async add(data: Attendance): Promise<Attendance> {
    list.push(data);

    return data;
  },
  async update(data: Attendance): Promise<Attendance> {
    let result: Attendance | undefined;

    for(let i = 0 ; i < list.length; i++) {
      const item = list[i];

      if(data.id === item.id) {
        list[i] = {
          ...item,
          ...data,
        };
        result = data;

        break;
      }
    }

    if (!result) {
      throw('attendance-not-encountered');
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

export default AttendanceMockRepo;
