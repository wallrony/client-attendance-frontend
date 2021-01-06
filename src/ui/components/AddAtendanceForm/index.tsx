import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Attendance from '../../../core/models/Attendance';
import Service from '../../../core/models/Service';
import { convertToInputElement } from '../../../core/utils/ConvertUtils';
import AppForm from '../AppForm';

import './styles.css';

export interface AddAtendanceFormHandlers {
  getAttendance: () => Attendance;
  clearFields: () => void;
}

interface AddAtendanceFormProps {
  attendance: Attendance | undefined;
}

const AddAtendanceForm: React.RefForwardingComponent<AddAtendanceFormHandlers, AddAtendanceFormProps> = (({ attendance }, ref) => {
  const titleRef = React.createRef<Input>();

  const [initialValue, setInitialValue] = useState<Service[]>(attendance?.services ?? []);

  useEffect(() => {
    setTimeout(() => {
      if(attendance && attendance.services) {
        const attNameInput = (document.getElementById('attendance-name-input') as HTMLInputElement);
        
        attNameInput.value = attendance.title;

        setInitialValue(attendance.services)
      }
    }, 100);
  }, [attendance]);

  useImperativeHandle(ref, () => {
    return {
      getAttendance,
      clearFields,
    } as AddAtendanceFormHandlers;
  });

  function onSubmit(values: any) {
    return values;
  }

  function getAttendance() {
    const attTitle = titleRef.current?.input.value ?? '';

    const attendance: Attendance = {
      title: attTitle,
    }

    attendance.services = getServices();

    return attendance;
  }

  function getServices(): Service[] {
    const services: Service[] = [];

    let nextElement;
    let index = 0;

    do {
      const name = convertToInputElement(
        document.getElementById(`services_${index}_name`)
      )?.value ?? '';
      const description = convertToInputElement(
        document.getElementById(`services_${index}_description`)
      )?.value ?? '';
      const price = convertToInputElement(
        document.getElementById(`services_${index}_price`)
      )?.value ?? '';
      const duration = convertToInputElement(
        document.getElementById(`services_${index}_duration`)
      )?.value ?? '';

      const service: Service = {
        name,
        description,
        price: Number(price),
        duration: Number(duration) * 60,
      }

      services.push(service);

      index++;

      nextElement = document.getElementById(`services_${index}_name`);
    } while(nextElement !== null);

    return services;
  }

  function clearFields() {
    if(titleRef.current) {
      titleRef.current.input.value = '';
    }

    let nextElement;
    let index = 0;

    do {
      const nameElement = document.getElementById(`services_${index}_name`) as HTMLInputElement;
      const descriptionElement = document.getElementById(`services_${index}_description`) as HTMLInputElement;
      const priceElement = document.getElementById(`services_${index}_price`) as HTMLInputElement;
      const durationElement = document.getElementById(`services_${index}_duration`) as HTMLInputElement;

      if(nameElement && descriptionElement && priceElement && durationElement) {
        nameElement.value = '';
        descriptionElement.value = '';
        priceElement.value = '';
        durationElement.value = '';
      }

      index++;

      nextElement = document.getElementById(`services_${index}_name`);
    } while(nextElement !== null);
  }

  return (
    <AppForm
      id="add-attendance-form"
      onFinish={onSubmit}
      title=''
      >
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true, message: 'Você precisa inserir o nome!' }]}
      >
        <Input
          id="attendance-name-input"
          ref={titleRef}
          value={attendance?.title}
        />
      </Form.Item>

      <Divider dashed style={{ borderWidth: 2 }} />

      <h2>Serviços</h2>

      <Form.List name="services" initialValue={initialValue}>
        { /** @ts-ignore */ }
        {(fields = initialValue, { add, remove }) => (
          <>
            {fields.map(field => (
              <>
                <div className="space-service-item-row" key={field.key} style={{ display: 'flex'}}>
                  <Space className="space-column">
                    <Form.Item
                      {...field}
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={[{ required: true, message: 'Insira o nome do serviço' }]}
                    >
                      <Input placeholder="Nome do Serviço" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'description']}
                      fieldKey={[field.fieldKey, 'description']}
                    >
                      <Input placeholder="Descrição" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'price']}
                      fieldKey={[field.fieldKey, 'price']}
                    >
                      <Input type="number" placeholder="Preço" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'duration']}
                      fieldKey={[field.fieldKey, 'duration']}
                    >
                      <Input type="number" placeholder="Duração - obs.: insira em minutos" />
                    </Form.Item>
                  </Space>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </div>
                <Divider dashed style={{ borderWidth: 2 }} />
              </>
            ))}
            <Form.Item>
              <Button id="add-service-btn" type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Adicionar Serviço
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </AppForm>
  );
});

export default forwardRef(AddAtendanceForm);
