import AuthCredentials from "../../core/models/AuthCredentials";
import AuthorizedUser from "../../core/models/AuthorizedUser";
import AuthRepository from "../../core/models/AuthRepository";
import User from "../../core/models/User";

interface IUsersRepo extends AuthRepository<User, AuthorizedUser<User>> {
  login: (credentials: AuthCredentials) => Promise<AuthorizedUser<User>>;
  register: (data: User) => Promise<boolean>;
  show: (id: number) => Promise<User>;
  update: (data: User) => Promise<User>;
}

export default IUsersRepo;
