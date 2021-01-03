import Repository from "../../core/models/Repository";
import Service from "../../core/models/Service";

interface IServicesRepo extends Repository<Service> {
  index(attendance_id: number): Promise<Service[]>;
  show(id: number): Promise<Service>;
  add(data: Service): Promise<Service>;
  update(data: Service): Promise<Service>;
  delete(id: number): Promise<boolean>;
}

export default IServicesRepo;
