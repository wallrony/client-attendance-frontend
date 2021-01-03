import Model from "./Model";

export default interface Service extends Model {
  id?: number;
  attendance_id?: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
}