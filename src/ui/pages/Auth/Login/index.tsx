import React from 'react';
import { useHistory } from 'react-router-dom';
import AppPage from '../../../../core/models/AppPage';
import AuthCredentials from '../../../../core/models/AuthCredentials';
import AuthorizedUser from '../../../../core/models/AuthorizedUser';
import Doctor from '../../../../core/models/Doctor';
import ServiceResponse from '../../../../core/models/ServiceResponse';
import User from '../../../../core/models/User';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../../core/utils/ToastUtils';
import StorageController from '../../../../data/static/StorageController';
import DoctorsService from '../../../../services/DoctorsService';
import UsersService from '../../../../services/UsersService';
import BasePage from '../../../components/BasePage';
import LoginForm from '../../../components/LoginForm';

function LoginPage({ browserProps }: AppPage) {
  const appHistory = useHistory();

  async function handleLogin(credentials: AuthCredentials, isDoctor: boolean) {
    showLoadingView();

    let result;

    if(isDoctor) {
      result = await DoctorsService.login(
        credentials
      );

      if(result.data && result.data.user) {
        StorageController.saveDoctorID(result.data.user.doctor_id)
      }
    } else {
      result = await UsersService.login(
        credentials
      );
    }

    treatLoginResult(result, isDoctor);

    hideLoadingView();
  }

  function treatLoginResult(result: ServiceResponse<AuthorizedUser<User | Doctor>>, isDoctor: boolean) {
    if(result.err) {
      showToast(result.err);

      return;
    }

    if(result.data && browserProps) {
      appHistory.push('/');

      browserProps.changeAuth(result.data, isDoctor);
    }
  }

  return (
    <BasePage pageTitle={''}>
      <LoginForm handleSubmit={handleLogin} />
    </BasePage>
  );
}

export default LoginPage;
