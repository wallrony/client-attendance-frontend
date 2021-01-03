import Model from "./Model";

interface Repository<T extends Model> {
  index?: (...args: any[]) => Promise<T[]>;
  show?: (...args: any[]) => Promise<T>;
  add?: (...args: any[]) => Promise<T>;
  update?: (...args: any[]) => Promise<T>;
  delete?: (...args: any[]) => Promise<boolean>;
}

export default Repository;
