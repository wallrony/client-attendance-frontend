import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { CalendarOutlined, IdcardOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Select, Switch } from 'antd';
import { Form } from 'antd';
import { FaAsterisk } from 'react-icons/fa';
import AppForm from '../AppForm';
import PrimaryButton from '../PrimaryButton';
import Attendance from '../../../core/models/Attendance';
import AttendancesService from '../../../services/AttendancesService';
import ServiceResponse from '../../../core/models/ServiceResponse';
import { showToast } from '../../../core/utils/ToastUtils';
import { hideLoadingView, showLoadingView } from '../../../core/utils/LoadingViewUtils';

export interface RegisterFormHandlers {
  clearFields: () => void;
}

interface RegisterFormProps {
  handleSubmit: (args: any) => void;
}

const RegisterForm: React.RefForwardingComponent<RegisterFormHandlers, RegisterFormProps> = ({ handleSubmit }, ref) => {
  const [isDoctor, setIsDoctor] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {
      clearFields
    };
  });

  const [attendances, setAttendances] = useState<Attendance[]>();

  useEffect(() => {
    if(isDoctor && (!attendances || !attendances.length)) {
      fetchAttendances();
    }

    // eslint-disable-next-line
  }, [isDoctor])

  async function fetchAttendances() {
    showLoadingView();

    const result = await AttendancesService.index();

    treatAttendances(result);

    hideLoadingView();
  }

  function treatAttendances(result: ServiceResponse<Attendance[]>) {
    if(result.err) {
      showToast(result.err);
    } else {
      setAttendances(result.data);
    }
  }

  const userNameRef = React.createRef<Input>();
  const userEmailRef = React.createRef<Input>();
  const birthdayRef = React.createRef<Input>();
  const userPasswordRef = React.createRef<Input>();
  const doctorCRMRef = React.createRef<Input>();

  function onFinish(values: any) {
    handleSubmit(values);
  }

  function clearFields() {
    if(userNameRef.current && userEmailRef.current &&
      birthdayRef.current && userPasswordRef.current) {
      userNameRef.current.input.value = ''
      userEmailRef.current.input.value = ''
      birthdayRef.current.input.value = ''
      userPasswordRef.current.input.value = ''
    }

    if(doctorCRMRef.current) {
      doctorCRMRef.current.input.value = ''
    }
  }

  return (
    <AppForm
      title="Cadastrar"
      onFinish={onFinish}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: 'Você precisa inserir seu nome!' }]}
      >
        <Input
          ref={userNameRef}
          // placeholder="Insira seu e-mail"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

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
        label="Nascimento"
        name="birthday"
        rules={[{ required: true, message: 'Você precisa inserir sua data de nascimento!' }]}
      >
        <Input
          ref={birthdayRef}
          // placeholder="Insira seu e-mail"
          prefix={<CalendarOutlined className="site-form-item-icon" />}
          type="date"
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

      {
        isDoctor ?
          <>
            <Form.Item
              label="CRM"
              name="crm"
              rules={[{ required: true, message: 'Você precisa inserir seu CRM!' }]}
            >
              <Input
                ref={doctorCRMRef}
                // placeholder="Insira sua senha"
                prefix={<IdcardOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item name="attendence_id" label="Atendimento" rules={[{ required: true, message: 'O tipo do atendimento é necessário!' }]}>
              <Select
                placeholder="Selecione o atendimento que deseja atuar:"
              >
                {
                  attendances?.map(
                    item => (
                      <option value={item.id}>{item.title}</option>
                    )
                  )
                }
              </Select>
            </Form.Item>
          </>
        : null
      }
      
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
        Cadastrar
      </PrimaryButton>
    </AppForm>
  );
}

export default forwardRef(RegisterForm);
