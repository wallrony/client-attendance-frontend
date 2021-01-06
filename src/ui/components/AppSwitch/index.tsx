import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppRoute from '../../../core/models/AppRoute';
import BrowserProps from '../../../core/models/BrowserProps';
import NotFoundPage from '../../pages/NotFoundPage';

interface IAppSwitch {
  routes: AppRoute[];
  verifyPanicError: (error: string) => boolean;
  browserProps: BrowserProps;
}

const AppSwitch: React.FC<IAppSwitch> = ({ routes, verifyPanicError, browserProps }) => {
  return (
    <Switch>
      {
        routes.map(
          (item: AppRoute) => {
            if(item.haveBrowserProps) {
              return <Route
                key={`route-${item.routeName}`}
                path={item.path}
                render={
                  props => <item.component
                    routeProps={props}
                    pageTitle={item.routeName}
                    verifyPanicError={verifyPanicError}
                    browserProps={browserProps}
                  />
                }
                exact
              />
            } else {
              return (
                <Route
                  key={`route-${item.routeName}`}
                  path={item.path}
                  render={
                    props => <item.component
                      routeProps={props}
                      pageTitle={item.routeName}
                      verifyPanicError={verifyPanicError}
                    />
                  }
                  exact
                />
              );
            }
          }
        )
      }
      <Route
        path="*"
        render={
          props => <NotFoundPage
            routeProps={props}
            pageTitle="Página não Encontrada"
            verifyPanicError={verifyPanicError}
          />
        }
      />
    </Switch>
  );
}

export default AppSwitch;
