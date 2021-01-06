import Form from 'antd/lib/form/Form';
import React from 'react';

import './styles.css';

interface AppFormProps {
  id?: string;
  title: string;
  onFinish: (values: any) => void;
}

const AppForm: React.FC<AppFormProps> = ({ children, id, title, onFinish }) => {
  return (
    <Form
      className="app-form"
      onFinish={onFinish}
    >
      <h1>{title}</h1>
      {children}
    </Form>
  );
}

export default AppForm;
