import Attendance from "../core/models/Attendance";
import AuthCredentials from "../core/models/AuthCredentials";
import Commission from "../core/models/Commission";
import Doctor from "../core/models/Doctor";
import Service from "../core/models/Service";
import User from "../core/models/User";
import UserAttendance from "../core/models/UserAttendance";
import IAttendancesRepo from "./abstraction/IAttendancesRepo";
import IUsersRepo from "./abstraction/IUsersRepo";
import ICommissionRepo from "./abstraction/ICommissionsRepo";
import IDoctorsRepo from "./abstraction/IDoctorsRepo";
import IServicesRepo from "./abstraction/IServicesRepo";
import IUserAttendancesRepo from "./abstraction/IUserAttendancesMockRepo";
import AttendanceMockRepo from "./mock/AttendanceMockRepo"
import UsersMockRepo from "./mock/UsersMockRepo";
import CommissionMockRepo from "./mock/CommissionsMockRepo";
import DoctorsMockRepo from "./mock/DoctorsMockRepo";
import ServicesMockRepo from "./mock/ServicesMockRepo";
import UserAttendancesMockRepo from "./mock/UserAttendancesMockRepo";
import { getApplicationDataDest } from '../core/utils/ResponseUtils';

let attendancesRepo: IAttendancesRepo;
let authRepo: IUsersRepo;
let commissionsRepo: ICommissionRepo;
let doctorAuthRepo: IDoctorsRepo;
let servicesRepo: IServicesRepo;
let userAttendances: IUserAttendancesRepo;

const dataDest = getApplicationDataDest();

if(dataDest === 'mock') {
  attendancesRepo = AttendanceMockRepo;
  authRepo = UsersMockRepo;
  commissionsRepo = CommissionMockRepo;
  doctorAuthRepo = DoctorsMockRepo;
  servicesRepo = ServicesMockRepo;
  userAttendances = UserAttendancesMockRepo;
}

export default {
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
  async deleteService(id: number) {
    return await servicesRepo.delete(id);
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
}
