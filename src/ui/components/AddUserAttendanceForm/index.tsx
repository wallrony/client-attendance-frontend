import { CalendarOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Select } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Attendance from '../../../core/models/Attendance';
import Service from '../../../core/models/Service';
import UserAttendance from '../../../core/models/UserAttendance';
import { showToast } from '../../../core/utils/ToastUtils';
import StorageController from '../../../data/static/StorageController';
import AppForm from '../AppForm';
import CompressDirection from '../CompressDirection';

export interface AddUserAttendanceFormHandlers {
  clearFields: () => void;
  getUserAttendance: () => UserAttendance | undefined;
}

interface AddUserAttendanceFormProps {
  attendances: Attendance[];
  onFinish: (values: any) => void;
}

const AddUserAttendanceForm: React.RefForwardingComponent<AddUserAttendanceFormHandlers, AddUserAttendanceFormProps> = ({ onFinish, attendances }, ref) => {
  const dateRef = React.createRef<Input>();
  const [servicesRefMap, setServicesRefMap] = useState<Record<number, React.RefObject<HTMLInputElement>>>({});

  const [selectedAttendence, setSelectedAttendance] = useState<number>();

  useImperativeHandle(ref, () => {
    return {
      clearFields,
      getUserAttendance
    }
  });

  useEffect(() => {
    if(selectedAttendence) {
      const refMap: Record<number, React.RefObject<HTMLInputElement>> = {};

      const services = attendances[selectedAttendence].services ?? [];

      for(const service of services) {
        if(service.id) {
          refMap[service.id] = React.createRef<HTMLInputElement>();
        }
      }

      setServicesRefMap(refMap);
    }
  }, [selectedAttendence, attendances]);

  function clearFields() {
    if(dateRef.current) {
      dateRef.current.input.value = ''

      setSelectedAttendance(undefined);

      for(const key of Object.keys(servicesRefMap)) {
        const item = servicesRefMap[Number(key)];

        if(key && item && item.current) {
          item.current.checked = false;
        }
      }
    }
  }

  function getUserAttendance(): UserAttendance | undefined {
    const userAttendance: UserAttendance = {} as UserAttendance;

    if(dateRef.current) {
      userAttendance.date = dateRef.current.input.value
    }

    userAttendance.attendance_id = Number(selectedAttendence);
    userAttendance.user_id = Number(StorageController.getUserID());
    userAttendance.services = getServices();

    let error: string = '';

    if(!userAttendance.date.length) {
      error = 'Você precisa inserir a data do atendimento.';
    } else if(!userAttendance.services.length) {
      error = 'Você precisa selecionar no mínimo um serviço.';
    }

    if(error.length) {
      showToast(error);

      return;
    }

    return userAttendance;
  }

  function getServices() {
    if(!selectedAttendence) {
      return [];
    }

    const attendance: Attendance = attendances.filter(item => item.id === selectedAttendence)[0]

    const services: Service[] = [];

    if(attendance.services) {
      for(const item of attendance.services) {
        if(item.id) {
          //@ts-ignore
          if(servicesRefList[item.id].current?.input.checked) {
            services.push(item);
          }
        }
      }
    }

    return services;
  }

  if(!attendances) {
    return <p>Carregando tipos de atendimento...</p>;
  } else if(!attendances.length) {
    return <p>Não há nenhum atendimento disponível.</p>;
  }

  let serviceList;

  if(selectedAttendence) {
    serviceList = (
      <Form.Item id="services-list" name="services" label="Serviços do Atendimento">
        {attendances.filter(item => item.id === selectedAttendence)[0]?.services?.map(service => (
          <Form.Item name="remember" valuePropName={`checked_${service.id}`} noStyle> 
            <Checkbox ref={servicesRefMap[Number(service.id)]}>{service.name}</Checkbox>
          </Form.Item>
        ))}
      </Form.Item>
    );
  }

  return (
    <AppForm
      id="schedule-attendance-page"
      onFinish={onFinish}
      title={''}
    >
      <CompressDirection direction="vertical">
        <Form.Item
          label="Data"
          name="birthday"
          rules={[{ required: true, message: 'Você precisa inserir a data do atendimento!' }]}
        >
          <Input
            ref={dateRef}
            // placeholder="Insira seu e-mail"
            prefix={<CalendarOutlined className="site-form-item-icon" />}
            type="datetime-local"
          />
        </Form.Item>
        <Form.Item name="attendence_id" label="Atendimento" rules={[{ required: true, message: 'Escolha o atendimento!' }]}>
          <Select
            placeholder="Selecione o atendimento:"
            onChange={value => setSelectedAttendance(Number(value))}
            allowClear
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
      </CompressDirection>
      { serviceList }
    </AppForm>
  )
}

export default forwardRef(AddUserAttendanceForm);
