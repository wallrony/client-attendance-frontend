import AuthorizedUser from "./AuthorizedUser";
import Doctor from "./Doctor";
import User from "./User";

interface BrowserProps {
  changeAuth: (data: AuthorizedUser<User>, isDoctor: boolean) => void;
  user: User | Doctor;
}

export default BrowserProps;