import { MailOutlined } from '@ant-design/icons';
import { Input, Switch } from 'antd';
import { Form } from 'antd';
import React, { useState } from 'react';
import { FaAsterisk } from 'react-icons/fa';
import AuthCredentials from '../../../core/models/AuthCredentials';
import AppForm from '../AppForm';
import PrimaryButton from '../PrimaryButton';

import './styles.css';

interface LoginFormProps {
  handleSubmit: (credentials: AuthCredentials, isDoctor: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit }) => {
  const [isDoctor, setIsDoctor] = useState<boolean>(false);

  const userEmailRef = React.createRef<Input>();
  const userPasswordRef = React.createRef<Input>();

  function onFinish(values: any) {
    const credentials: AuthCredentials = {
      email: String(values['email']),
      password: String(values['password']),
    }

    handleSubmit(credentials, isDoctor)
  }

  return (
    <AppForm
      title="Entrar"
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Você precisa inserir seu e-mail!' }]}
      >
        <Input
          ref={userEmailRef}
          // placeholder="Insira seu e-mail"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      
      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: 'Você precisa inserir sua senha!' }]}
      >
        <Input
          ref={userPasswordRef}
          // placeholder="Insira sua senha"
          prefix={<FaAsterisk className="site-form-item-icon" />}
          type="password"
        />
      </Form.Item>
      
      <div className="doctor-switch">
        <Switch
          title="Sou doutor."
          onChange={(checked) => setIsDoctor(checked)}
        />
        <span>Sou doutor.</span>
      </div>

      <PrimaryButton
        type="submit"
      >
        Entrar
      </PrimaryButton>
    </AppForm>
  );
}

export default LoginForm;
