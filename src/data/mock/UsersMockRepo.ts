import AuthCredentials from "../../core/models/AuthCredentials";
import User from "../../core/models/User";
import IUsersRepo from '../abstraction/IUsersRepo';

const list: User[] = [];

list.push({
  id: 1,
  name: 'Admin',
  email: 'admin@admin.com',
  birthday: '2000-01-01',
  is_admin: true,
  password: '123456',
});

list.push({
  id: 2,
  name: 'User',
  email: 'user@user.com',
  birthday: '2000-01-01',
  is_admin: false,
  password: '123456',
});

list.push({
  id: 3,
  name: 'Doctor',
  email: 'doc@doc.com',
  birthday: '2000-01-01',
  is_admin: false,
  password: '123456',
});

const UsersMockRepo: IUsersRepo = {
  async login(credentials: AuthCredentials): Promise<User> {
    let result: User | undefined = undefined;

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
      throw('user-not-found');
    }

    return result;
  },
  async register(data: User): Promise<boolean> {
    list.push(data);

    return true;
  },
  async show(id: number): Promise<User> {
    let result: User | undefined = undefined;

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
  async update(data: User): Promise<User> {
    let result: User | undefined = undefined;

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

export default UsersMockRepo;
