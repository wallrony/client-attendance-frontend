import React from 'react';
import AppPage from '../../../core/models/AppPage';
import BasePage from '../../components/BasePage';

const HomePage: React.FC<AppPage> = ({ routeProps, pageTitle }) => {
  return (
    <BasePage id="home-page" pageTitle={pageTitle}>
      <p>Home Page</p>
    </BasePage>
  );
}

export default HomePage;
