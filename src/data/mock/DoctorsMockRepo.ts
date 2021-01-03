import AuthCredentials from "../../core/models/AuthCredentials";
import Doctor from "../../core/models/Doctor";
import IDoctorsRepo from "../abstraction/IDoctorsRepo";

const list: Doctor[] = [];

list.push({
  id: 1,
  user_id: 3,
  crm: '00/0000-000',
  attendance_id: 1,
  name: 'Doctor',
  email: 'doc@doc.com',
  birthday: '2000-01-01',
  is_admin: false,
  password: '123456',
});

const DoctorsMockRepo: IDoctorsRepo = {
  async login(credentials: AuthCredentials): Promise<Doctor> {
    let result: Doctor | undefined = undefined;

    for(const item of list) {
      if(
        item.email === credentials.email &&
        item.password === credentials.password
      ) {
        result = item;

        break;
      }
    }

    if(!result) {
      throw Error('user-not-found');
    }

    return result;
  },
  async register(data: Doctor): Promise<boolean> {
    list.push(data);

    return true;
  },
  async show(id: number): Promise<Doctor> {
    let result: Doctor | undefined = undefined;

    for(const item of list) {
      if(
        item.id === id
      ) {
        result = item;

        break;
      }
    }

    if(!result) {
      throw('user-not-encountered');
    }

    return result;
  },
  async update(data: Doctor): Promise<Doctor> {
    let result: Doctor | undefined = undefined;

    for(let i = 0 ; i < list.length; i++) {
      const item = list[i];
      if(
        item.id === data.id
      ) {
        list[i] = {
          ...list[i],
          ...data
        };

        result = list[i];

        break;
      }
    }

    if(!result) {
      throw('user-not-encountered');
    }

    return result;
  },
}

export default DoctorsMockRepo;
