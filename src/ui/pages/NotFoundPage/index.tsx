import React from 'react';
import { useHistory } from 'react-router-dom'

import { Button } from 'antd';
import AppPage from '../../../core/models/AppPage';
import BasePage from '../../components/BasePage';

import './styles.css';

const NotFoundPage: React.FC<AppPage> = ({ routeProps, pageTitle }) => {
  const appHistory = useHistory();

  function handleClickBackHome(event: React.MouseEvent) {
    appHistory.push('/')
  }

  return (
    <BasePage pageTitle={''} id="not-found-page">
      <h1>Erro 404</h1>
      <h2>Página não encontrada</h2>
      <p>Esse endereço de página não existe.</p>
      <Button onClick={handleClickBackHome}>Voltar para Home</Button>
    </BasePage>
  );
}

export default NotFoundPage;
