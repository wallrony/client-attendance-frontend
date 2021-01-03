import Model from "./Model";

interface User extends Model {
  id?: number;
  name: string;
  birthday: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export default User;
