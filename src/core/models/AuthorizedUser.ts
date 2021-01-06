import Doctor from "./Doctor";
import User from "./User";

export default interface AuthorizedUser<T extends User = User> {
  user?: T;
  auth_token: string;
}