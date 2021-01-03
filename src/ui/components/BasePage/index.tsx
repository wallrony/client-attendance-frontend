import Layout from 'antd/lib/layout/layout';
import React from 'react';

import './styles.css';

interface BasePageProps {
  id?: string;
  pageTitle?: string;
}

const BasePage: React.FC<BasePageProps> = ({ children, pageTitle = '', id }) => {
  let title;

  if(pageTitle.length) {
    title = (<h2 id="app-page-title">{pageTitle}</h2>);
  }

  return (
    <Layout id={id} className="app-page">
      {title}
      {children}
    </Layout>
  );
}

export default BasePage;
