import AuthCredentials from "../../core/models/AuthCredentials";
import AuthRepository from "../../core/models/AuthRepository";
import User from "../../core/models/User";

interface IUsersRepo extends AuthRepository<User> {
  login: (credentials: AuthCredentials) => Promise<User>;
  register: (data: User) => Promise<boolean>;
  show: (id: number) => Promise<User>;
  update: (data: User) => Promise<User>;
}

export default IUsersRepo;
