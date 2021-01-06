import Layout from 'antd/lib/layout/layout';
import React from 'react';
import PrimaryButton from '../PrimaryButton';

import './styles.css';

interface BasePageMainButtonProps {
  title: string;
  onClick: () => void;
}

interface BasePageProps {
  id?: string;
  pageTitle?: string;
  mainButton?: BasePageMainButtonProps;
}

const BasePage: React.FC<BasePageProps> = ({ children, pageTitle = '', id, mainButton }) => {
  let title;

  if(pageTitle.length) {
    title = (<h2 id="app-page-title">{pageTitle}</h2>);
  }

  return (
    <Layout id={id} className="app-page">
      <div id="base-page-header">
        {title}
        <PrimaryButton
          id="base-page-main-btn"
          type="button"
          onClick={mainButton?.onClick}
        >
          {mainButton?.title}
        </PrimaryButton>
      </div>
      {children}
    </Layout>
  );
}

export default BasePage;
