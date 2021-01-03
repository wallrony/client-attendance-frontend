import Model from "./Model";

export default interface Commission extends Model {
  id?: number;
  doctor_id: number;
  client_attendance_id: number;
  value: number
}