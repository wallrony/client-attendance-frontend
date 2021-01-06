import React, { useEffect, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import AppRoute from '../../../core/models/AppRoute';
import AuthorizedUser from '../../../core/models/AuthorizedUser';
import BrowserProps from '../../../core/models/BrowserProps';
import Doctor from '../../../core/models/Doctor';
import ServiceResponse from '../../../core/models/ServiceResponse';
import User from '../../../core/models/User';
import { findErrorMessage } from '../../../core/utils/ResponseUtils';
import { getRoutes } from '../../../core/utils/RouterUtils';
import { showToast } from '../../../core/utils/ToastUtils';
import StorageController from '../../../data/static/StorageController';
import DoctorsService from '../../../services/DoctorsService';
import UsersService from '../../../services/UsersService';
import AppHeader from '../AppHeader';
import AppSwitch from '../AppSwitch';
import LoadingView from '../LoadingView';
import SideBar from '../SideBar';
import { Toast } from '../Toast';

function AppRouter() {
  const [user, setUser] = useState<User>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [routes, setRoutes] = useState<AppRoute[]>(getRoutes(isAuth, isAdmin, isDoctor));
  
  useEffect(() => {
    const user_id = StorageController.getUserID();
    const doctor_id = StorageController.getDoctorID();

    const auth_token = StorageController.getToken();

    if(user_id && auth_token) {
      loginAlreadyUser(user_id, doctor_id, auth_token);
    }

    // eslint-disable-next-line
  }, []);

  async function loginAlreadyUser(
    user_id: number,
    doctor_id: number | undefined,
    auth_token: string
  ) {
    const authorizedUser: AuthorizedUser<Doctor | User> = {
      auth_token
    };

    let err: string | undefined;

    if(doctor_id) {
      const result: ServiceResponse<Doctor> = await DoctorsService.show(doctor_id);

      authorizedUser.user = result.data;
      err = result.err;

      if(result.data) {
        StorageController.saveDoctorID(result.data.doctor_id);

        setIsDoctor(true);
      }
    } else {
      const result: ServiceResponse<User> = await UsersService.show(user_id);
      
      authorizedUser.user = result.data;
      err = result.err;
    }

    if(err) {
      showToast(err);

      StorageController.clearAll();
    } else {
      changeAuth(authorizedUser, doctor_id !== undefined);
    }
  }

  const browserProps: BrowserProps = {
    changeAuth,
    user: user ? user : {} as User
  }

  const panicErrors = [
    findErrorMessage('unauthorized-user'),
    findErrorMessage('user-not-encountered'),
  ];

  function signOut() {
    StorageController.clearAll();
    setUser(undefined);
    setIsAuth(false);
    setIsAdmin(false);
    setIsDoctor(false);

    setRoutes(getRoutes(false, false, false));
  }

  function signIn(data: AuthorizedUser<Doctor | User>, isDoctor: boolean) {
    if(data.user) {
      setUser(data.user);
      setIsAdmin(data.user.is_admin);
      setIsAuth(true);

      setRoutes(getRoutes(true, data.user.is_admin, isDoctor));
    }
  }

  function signInUser(data: AuthorizedUser<User>) {
    if(data.user && data.user.id) {
      StorageController.saveUserInfo(data.user.id, data.auth_token);

      signIn(data, false);
    } else {
      StorageController.clearAll();
    }
  }

  function signInDoctor(data: AuthorizedUser<Doctor>) {
    if(data.user && data.user.user_id) {
      StorageController.saveUserInfo(data.user?.user_id, data.auth_token);
      StorageController.saveDoctorID(data.user.id)

      setIsDoctor(true);
      
      signIn(data, true);
    } else {
      StorageController.clearAll();
    }
  }

  function changeAuth(data: AuthorizedUser<Doctor | User>, isDoctor: boolean) {
    if(!data.user) {
      signOut();

      return
    }

    if(isDoctor) {
      signInDoctor(data as AuthorizedUser<Doctor>);
    } else {
      signInUser(data as AuthorizedUser<User>);
    }
  }

  function verifyPanicError(error: string) {
    if(panicErrors.includes(error)) {
      signOut();

      showToast(error);

      return false;
    }

    return true;
  }

  let header, sideBar;

  header = <AppHeader user={user} signOut={signOut} />;
  sideBar = <SideBar routes={routes} />;

  return (
    <BrowserRouter>
      {header}
      <main>
        {sideBar}
        <AppSwitch
          routes={routes}
          verifyPanicError={verifyPanicError}
          browserProps={browserProps}
        />
      </main>
      <LoadingView />
      <Toast />
    </BrowserRouter>
  );
}

export default AppRouter;
