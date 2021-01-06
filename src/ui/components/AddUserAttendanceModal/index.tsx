import Modal from 'antd/lib/modal/Modal';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Attendance from '../../../core/models/Attendance';
import ServiceResponse from '../../../core/models/ServiceResponse';
import UserAttendance from '../../../core/models/UserAttendance';
import { hideLoadingView, showLoadingView } from '../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../core/utils/ToastUtils';
import AttendancesService from '../../../services/AttendancesService';
import AddUserAtendanceForm, { AddUserAttendanceFormHandlers } from '../AddUserAttendanceForm';

import './styles.css';

export interface AddUserAttendancesModalHandlers {
  clearFields: () => void;
  getUserAttendance: () => UserAttendance;
}

interface AddUserAttendancesModalProps {
  show: boolean;
  hide: () => void;
  panic: (error: string) => boolean;
  onFinish: (data: UserAttendance | undefined) => void;
}

const AddUserAttendancesModal: React.RefForwardingComponent<AddUserAttendancesModalHandlers, AddUserAttendancesModalProps> = ({ show, hide, onFinish, panic }, ref) => {
  const appHistory = useHistory();

  const formRef = React.createRef<AddUserAttendanceFormHandlers>();

  const [attendances, setAttendances] = useState<Attendance[]>();

  useEffect(() => {
    async function fetchAttendances() {
      showLoadingView();
  
      const result = await AttendancesService.index();
  
      treatAttendances(result);
  
      hideLoadingView();
    }

    if(show) {
      fetchAttendances();
    }

    // eslint-disable-next-line
  }, [show]);

  function treatAttendances(result: ServiceResponse<Attendance[]>) {
    if(result.err) {
      const canContinue = panic(result.err)

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct()
      }
    } else {
      setAttendances(result.data);
    }
  }

  function panicAct() {
    appHistory.push('/');
  }

  useEffect(() => {
    formRef.current?.clearFields();

    // eslint-disable-next-line
  }, [show]);

  useImperativeHandle(ref, () => {
    return {
      getUserAttendance,
      clearFields
    } as AddUserAttendancesModalHandlers;
  });

  function getUserAttendance(): UserAttendance | undefined {
    let data: UserAttendance | undefined = {
      attendance_id: 0,
      date: '',
      user_id: 0,
      services: []
    }

    if(formRef.current) {
      data = formRef.current.getUserAttendance();
    }

    return data;
  }

  function clearFields() {
    formRef.current?.clearFields();
  }

  let content;

  if(!attendances) {
    content = <p>Carregando tipos de atendimentos...</p>;
  } else if(!attendances.length) {
    content = <p>Nenhum atendimento foi carregado. Não é possível realizar o agendamento, por favor, tente novamente mais tarde ou contate o suporte.</p>
  } else {
    content = <AddUserAtendanceForm
      ref={formRef}
      attendances={attendances}
      onFinish={() => {}}
    />;
  }

  return (
    <Modal
      className="modal-user-attendances"
      title="Agendar Atendimento"
      visible={show}
      onOk={() => onFinish(getUserAttendance())}
      onCancel={() => hide()}
    >
      {content}
    </Modal>
  );
}

export default forwardRef(AddUserAttendancesModal);
