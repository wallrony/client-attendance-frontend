import {
  BarsOutlined,
  DashboardOutlined,
  HomeOutlined,
  LoginOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import AttendancesPage from "../../ui/pages/Admin/AttendancesPage";
import LoginPage from "../../ui/pages/Auth/Login";
import RegisterPage from "../../ui/pages/Auth/RegisterPage";
import CommissionsPage from "../../ui/pages/Doctor/CommissionsPage";
import DoctorAttendancesPage from "../../ui/pages/Doctor/DoctorAttendancesPage";
import HomePage from "../../ui/pages/HomePage";
import UserAttendancePage from "../../ui/pages/User/UserAttendancePage";
import AppRoute from "../models/AppRoute";

const authRoutes: AppRoute[] = [
  {
    path: '/',
    routeName: 'Página Inicial',
    component: HomePage,
    icon: HomeOutlined,
  },
  {
    path: '/entrar',
    routeName: 'Entrar',
    component: LoginPage,
    icon: LoginOutlined,
    haveBrowserProps: true,
  },
  {
    path: '/cadastro',
    routeName: 'Cadastrar',
    component: RegisterPage,
    icon: UserAddOutlined,
  },
];

const adminRoutes: AppRoute[] = [
  {
    path: '/',
    routeName: 'Tipos de Atendimentos',
    component: AttendancesPage,
    icon: BarsOutlined,
    haveBrowserProps: true,
  },
];

const userRoutes: AppRoute[] = [
  {
    path: '/',
    routeName: 'Ver Meus Atendimentos',
    component: UserAttendancePage,
    icon: UnorderedListOutlined,
    haveBrowserProps: true,
  },
];

const doctorsRoutes: AppRoute[] = [
  {
    path: '/',
    routeName: 'Minhas Comissões',
    component: CommissionsPage,
    icon: DashboardOutlined,
    haveBrowserProps: true,
  },
  {
    path: '/listar-atendimentos',
    routeName: 'Listar Atendimentos',
    component: DoctorAttendancesPage,
    icon: UnorderedListOutlined,
    haveBrowserProps: true,
  },
];

export function getRoutes(isAuth: boolean, isAdmin: boolean, isDoctor: boolean) {
  if(!isAuth) {
    return authRoutes;
  }
  
  if(isAdmin) {
    return adminRoutes;
  } else {
    if(isDoctor) {
      return doctorsRoutes;
    } else {
      return userRoutes;
    }
  }
}
