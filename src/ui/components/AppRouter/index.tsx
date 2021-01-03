import React, { useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import User from '../../../core/models/User';
import { getRoutes } from '../../../core/utils/RouterUtils';
import AppHeader from '../AppHeader';
import AppSwitch from '../AppSwitch';
import LoadingView from '../LoadingView';
import SideBar from '../SideBar';

const AppRouter = () => {
  
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  function signOut(event: React.MouseEvent) {
    console.log("logout");

    setUser(undefined);
    setIsAuth(false);
    setIsAdmin(false);
  }

  let header, sideBar;

  header = <AppHeader user={user} signOut={signOut} />;
  sideBar = <SideBar routes={getRoutes(isAuth, isAdmin)} />;

  return (
    <BrowserRouter>
      {header}
      <main>
        {sideBar}
        <AppSwitch routes={getRoutes(isAuth, isAdmin)} />
      </main>
      <LoadingView />
    </BrowserRouter>
  );
}

export default AppRouter;
