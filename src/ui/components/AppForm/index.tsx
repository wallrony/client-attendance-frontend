import Form from 'antd/lib/form/Form';
import React from 'react';

import './styles.css';

interface AppFormProps {
  title: string;
}

const AppForm: React.FC<AppFormProps> = ({ children, title }) => {
  return (
    <Form className="app-form">
      <h1>{title}</h1>
      {children}
    </Form>
  );
}

export default AppForm;
