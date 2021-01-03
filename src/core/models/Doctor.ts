import User from "./User";

export default interface Doctor extends User {
  user_id?: number;
  attendance_id: number;
  crm: string;
}