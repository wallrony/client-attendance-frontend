import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppRoute from '../../../core/models/AppRoute';
import NotFoundPage from '../../pages/NotFoundPage';

interface IAppSwitch {
  routes: AppRoute[]
}

const AppSwitch: React.FC<IAppSwitch> = ({ routes }) => {
  return (
    <Switch>
      {
        routes.map(
          (item: AppRoute) => <Route
            key={`route-${item.routeName}`}
            path={item.path}
            render={
              props => <item.component
                routeProps={props}
                pageTitle={item.routeName}
              />
            }
            exact
          />
        )
      }
      <Route
        path="*"
        render={
          props => <NotFoundPage
            routeProps={props}
            pageTitle="Página não Encontrada"
          />
        }
      />
    </Switch>
  );
}

export default AppSwitch;
