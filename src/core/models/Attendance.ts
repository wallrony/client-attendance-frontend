import Model from "./Model";
import Service from "./Service";

export default interface Attendance extends Model {
  id?: number;
  title: string;
  services?: Service[];
}