import React from 'react';
import AppPage from '../../../core/models/AppPage';
import BasePage from '../../components/BasePage';

import './styles.css';

const HomePage: React.FC<AppPage> = ({ routeProps, pageTitle }) => {
  return (
    <BasePage id="home-page" pageTitle={pageTitle}>
      <p>Seja bem-vindo ao gerenciador de atendimentos virtual Saude+.</p>
      <p>Aqui será possível você marcar atendimentos com profissionais reais ou até mesmo se dispor a realizar atendimentos pedidos por clientes.</p>
      <p>Entre ou Cadastre-se para aproveitar da plataforma!</p>
    </BasePage>
  );
}

export default HomePage;
