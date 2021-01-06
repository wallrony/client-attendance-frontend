import Attendance from "../core/models/Attendance";
import AuthCredentials from "../core/models/AuthCredentials";
import Commission from "../core/models/Commission";
import Doctor from "../core/models/Doctor";
import Service from "../core/models/Service";
import User from "../core/models/User";
import UserAttendance from "../core/models/UserAttendance";
import IAttendancesRepo from "./abstraction/IAttendancesRepo";
import IUserAttendancesRepo from "./abstraction/IUserAttendancesRepo";
import IUsersRepo from "./abstraction/IUsersRepo";
import ICommissionRepo from "./abstraction/ICommissionsRepo";
import IDoctorsRepo from "./abstraction/IDoctorsRepo";
import IServicesRepo from "./abstraction/IServicesRepo";
import AttendancesRepo from "./api/AttendancesRepo";
import UsersRepo from "./api/UsersRepo";
import CommissionsRepo from "./api/CommissionsRepo";
import DoctorsRepo from "./api/DoctorsRepo";
import ServicesRepo from "./api/ServicesRepo";
import UserAttendancesRepo from "./api/UserAttendancesRepo";

let attendancesRepo: IAttendancesRepo;
let authRepo: IUsersRepo;
let commissionsRepo: ICommissionRepo;
let doctorAuthRepo: IDoctorsRepo;
let servicesRepo: IServicesRepo;
let userAttendances: IUserAttendancesRepo;

attendancesRepo = AttendancesRepo;
authRepo = UsersRepo
commissionsRepo = CommissionsRepo;
doctorAuthRepo = DoctorsRepo;
servicesRepo = ServicesRepo;
userAttendances = UserAttendancesRepo

const Facade = {
  async indexAttendances() {
    return await attendancesRepo.index();
  },
  async addAttendance(data: Attendance) {
    return await attendancesRepo.add(data);
  },
  async updateAttendance(data: Attendance) {
    return await attendancesRepo.update(data);
  },
  async deleteAttendance(id: number) {
    return await attendancesRepo.delete(id);
  },
  async login(credentials: AuthCredentials) {
    return await authRepo.login(credentials);
  },
  async doctorLogin(credentials: AuthCredentials) {
    return await doctorAuthRepo.login(credentials);
  },
  async register(data: User) {
    return await authRepo.register(data);
  },
  async doctorRegister(data: Doctor) {
    return await authRepo.register(data);
  },
  async showUser(id: number) {
    return await authRepo.show(id);
  },
  async updateUser(data: User) {
    return await authRepo.update(data);
  },
  async showDoctor(id: number) {
    return await doctorAuthRepo.show(id);
  },
  async updateDoctor(data: Doctor) {
    return await doctorAuthRepo.update(data);
  },
  async indexCommissions(doctor_id: number) {
    return await commissionsRepo.index(doctor_id);
  },
  async addCommission(data: Commission) {
    return await commissionsRepo.add(data);
  },
  async indexServices(attendance_id: number) {
    return await servicesRepo.index(attendance_id);
  },
  async addService(data: Service) {
    return await servicesRepo.add(data);
  },
  async updateService(data: Service) {
    return await servicesRepo.update(data);
  },
  async deleteService(attendance_id: number, id: number) {
    return await servicesRepo.delete(attendance_id, id);
  },
  async indexAllUserAttendances(doctor_id: number) {
    return await userAttendances.indexAll(doctor_id);
  },
  async indexUserAttendances(user_id: number) {
    return await userAttendances.index(user_id);
  },
  async addUserAttendance(data: UserAttendance, services: number[]) {
    return await userAttendances.add(data, services)
  },
  async updateUserAttendance(data: UserAttendance, services: number[]) {
    return await userAttendances.update(data, services);
  },
  async deleteUserAttendance(id: number) {
    return await userAttendances.delete(id);
  },
};

export default Facade;
