import Attendance from "../../core/models/Attendance";
import Repository from "../../core/models/Repository";

interface IAttendancesRepo extends Repository<Attendance> {
  index(): Promise<Attendance[]>;
  add(data: Attendance): Promise<Attendance>;
  update(data: Attendance): Promise<Attendance>;
  delete(id: number): Promise<boolean>;
}

export default IAttendancesRepo;
