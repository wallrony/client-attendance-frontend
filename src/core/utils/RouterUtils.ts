import { DashboardOutlined, HomeOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import AdminDashboardPage from "../../ui/pages/Admin/AdminDashboardPage";
import LoginPage from "../../ui/pages/Auth/Login";
import RegisterPage from "../../ui/pages/Auth/RegisterPage";
import HomePage from "../../ui/pages/HomePage";
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
    path: 'dashboard',
    routeName: 'Dashboard',
    component: AdminDashboardPage,
    icon: DashboardOutlined,
  }
];

export function getRoutes(isAuth: boolean, isAdmin: boolean) {
  if(!isAuth) {
    return authRoutes;
  }
  
  if(isAdmin) {
    return adminRoutes;
  } else {
    return authRoutes;
  }
}
