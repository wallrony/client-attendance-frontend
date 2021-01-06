import Model from "./Model";
import Service from "./Service";

export default interface UserAttendance extends Model {
  id?: number;
  attendance_id: number;
  user_id: number;
  title?: string;
  date: string;
  doctor_id?: number;
  status?: string;
  services?: Service[]
}
