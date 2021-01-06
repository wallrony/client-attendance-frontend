import React from 'react';
import AppPage from '../../../../core/models/AppPage';
import ServiceResponse from '../../../../core/models/ServiceResponse';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../../core/utils/ToastUtils';
import DoctorsService from '../../../../services/DoctorsService';
import UsersService from '../../../../services/UsersService';
import BasePage from '../../../components/BasePage';
import RegisterForm, { RegisterFormHandlers } from '../../../components/RegisterForm';

const RegisterPage: React.FC<AppPage> = ({ routeProps, pageTitle }) => {
  const formRef = React.createRef<RegisterFormHandlers>();

  async function handleSubmit(values: any) {
    showLoadingView();

    let result;

    if(values['attendance_id']) {
      result = await UsersService.register(values);
    } else {
      result = await DoctorsService.register(values);
    }

    treatRegister(result);

    hideLoadingView();
  }

  function treatRegister(result: ServiceResponse<boolean>) {
    if(result.err) {
      showToast(result.err);
    } else {
      formRef.current?.clearFields()
      
      showToast("Conta cadastrada com sucesso!");
    }
  }

  return (
    <BasePage pageTitle={''}>
      <RegisterForm
        ref={formRef}
        handleSubmit={handleSubmit}
      />
    </BasePage>
  );
}

export default RegisterPage;
