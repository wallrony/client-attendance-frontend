import Repository from "../../core/models/Repository";
import UserAttendance from "../../core/models/UserAttendance";

interface IUserAttendancesRepo extends Repository<UserAttendance> {
  index(user_id: number): Promise<UserAttendance[]>;
  add(data: UserAttendance, services: number[]): Promise<UserAttendance>;
  update(data: UserAttendance, services: number[]): Promise<UserAttendance>;
  delete(id: number): Promise<boolean>;
}

export default IUserAttendancesRepo;
