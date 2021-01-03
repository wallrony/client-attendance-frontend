import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import { FaAsterisk } from 'react-icons/fa';
import AppPage from '../../../../core/models/AppPage';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import AppForm from '../../../components/AppForm';
import BasePage from '../../../components/BasePage';
import PrimaryButton from '../../../components/PrimaryButton';

const LoginPage: React.FC<AppPage> = ({ routeProps, pageTitle }) => {
  const userEmailRef = React.createRef<Input>();
  const userPasswordRef = React.createRef<Input>();

  function handleLogin(event: React.MouseEvent) {
    showLoadingView();

    setTimeout(() => {
      hideLoadingView();
    }, 3000);
  }

  return (
    <BasePage pageTitle={''}>
      <AppForm title={pageTitle}>
        <Input
          ref={userEmailRef}
          placeholder="Insira seu e-mail"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <Input
          ref={userPasswordRef}
          placeholder="Insira sua senha"
          prefix={<FaAsterisk className="site-form-item-icon" />}
          type="password"
        />
        <PrimaryButton onClick={handleLogin}>Entrar</PrimaryButton>
      </AppForm>
    </BasePage>
  );
}

export default LoginPage;
