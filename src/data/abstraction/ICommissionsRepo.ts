import Commission from "../../core/models/Commission";
import Repository from "../../core/models/Repository";

interface ICommissionsRepo extends Repository<Commission> {
  index(doctor_id: number): Promise<Commission[]>;
  add(data: Commission): Promise<Commission>;
}

export default ICommissionsRepo;
