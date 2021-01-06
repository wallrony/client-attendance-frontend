import AuthCredentials from "../../core/models/AuthCredentials";
import AuthorizedUser from "../../core/models/AuthorizedUser";
import AuthRepository from "../../core/models/AuthRepository";
import Doctor from "../../core/models/Doctor";

interface IDoctorsRepo extends AuthRepository<Doctor, AuthorizedUser<Doctor>> {
  login: (credentials: AuthCredentials) => Promise<AuthorizedUser<Doctor>>;
  register: (data: Doctor) => Promise<boolean>;
  show: (id: number) => Promise<Doctor>;
  update: (data: Doctor) => Promise<Doctor>;
}

export default IDoctorsRepo;
