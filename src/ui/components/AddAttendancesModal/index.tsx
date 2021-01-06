import Modal from 'antd/lib/modal/Modal';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import Attendance from '../../../core/models/Attendance';
import AddAtendanceForm, { AddAtendanceFormHandlers } from '../AddAtendanceForm';

import './styles.css';

export interface AddAttendancesModalHandlers {
  clearFields: () => void;
}

interface AddAttendancesModalProps {
  edit?: boolean;
  attendance?: Attendance;
  show: boolean;
  hide: () => void;
  onFinish: (data: Attendance) => void;
}

const AddAttendancesModal: React.RefForwardingComponent<AddAttendancesModalHandlers, AddAttendancesModalProps> = ({ edit = false, attendance, show, hide, onFinish }, ref) => {
  const formRef = React.createRef<AddAtendanceFormHandlers>();

  useEffect(() => {
    if(formRef.current) {
      formRef.current.clearFields();
    }
  }, [show, formRef])

  useImperativeHandle(ref, () => {
    return {
      clearFields
    } as AddAttendancesModalHandlers;
  });

  function getAttendance() {
    let data: Attendance = {
      title: '',
      services: []
    }

    if(formRef.current) {
      data = formRef.current.getAttendance();
    }
    
    return data;
  }

  function clearFields() {
    if(formRef.current) {
      formRef.current.clearFields();
    }
  }

  let title;

  if(edit) {
    title = 'Editar Tipo de Atendimento';
  } else {
    title = "Adicionar Tipo de Atendimento";
  }

  return (
    <Modal
      className="modal-attendances"
      title={title}
      visible={show}
      onOk={() => onFinish(getAttendance())}
      onCancel={() => hide()}
    >
      <AddAtendanceForm ref={formRef} attendance={attendance} />
    </Modal>
  );
}

export default forwardRef(AddAttendancesModal);
