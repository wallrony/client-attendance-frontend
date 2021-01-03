import User from "./User";

export default interface AuthorizedUser {
  user?: User;
  auth_token?: string;
}