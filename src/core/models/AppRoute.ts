import { ExoticComponent } from "react";
import AppPage from "./AppPage";

interface AppRoute {
  path: string;
  routeName: string;
  component: React.FC<AppPage>;
  icon: ExoticComponent;
}

export default AppRoute;
