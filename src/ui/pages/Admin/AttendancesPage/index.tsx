import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AppPage from '../../../../core/models/AppPage';
import Attendance from '../../../../core/models/Attendance';
import ServiceResponse from '../../../../core/models/ServiceResponse';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../../core/utils/ToastUtils';
import AttendancesService from '../../../../services/AttendancesService';
import AddAttendancesModal, { AddAttendancesModalHandlers } from '../../../components/AddAttendancesModal';
import AttendancesTable from '../../../components/AttendancesTable';
import BasePage from '../../../components/BasePage';

const AttendancesPage: React.FC<AppPage> = ({ pageTitle, verifyPanicError }) => {
  const appHistory = useHistory();

  const modalRef = React.createRef<AddAttendancesModalHandlers>();

  const [attendances, setAttendances] = useState<Attendance[]>();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editAttendance, setEditAttendance] = useState<boolean>(false);
  const [attendanceToEdit, setAttendanceToEdit] = useState<Attendance>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    showLoadingView();

    const result = await AttendancesService.index();

    if(result.err) {
      showToast(result.err);
    } else if(result.data) {
      setAttendances(result.data)
    }

    hideLoadingView();
  }
  
  function handleShowAddModalEditting(attendance: Attendance) {
    showToast('Função ainda não implementada.');

    // setAttendanceToEdit(attendance);
    // setEditAttendance(true);
    // setShowAddModal(true);
  }

  function handleShowAddModal() {
    setAttendanceToEdit(undefined);
    setEditAttendance(false);
    setShowAddModal(true);
  }

  function hideAddModal() {
    modalRef.current?.clearFields();

    setAttendanceToEdit(undefined);
    setEditAttendance(false);

    setShowAddModal(false)
  }

  async function handleAddAtendance(data: Attendance) {
    showLoadingView();

    const result = await AttendancesService.add(data);

    treatAddAttendance(result);

    hideLoadingView();
  }

  async function handleEditAttendance(attendance: Attendance) {
    showLoadingView();

    if(attendance.id) {
      const result = await AttendancesService.update(attendance);

      treatEditAttendance(result);
    }

    hideLoadingView();
  }

  async function handleDeleteAttendance(id: number | undefined) {
    showLoadingView();

    if(id) {
      const result = await AttendancesService.delete(id);

      treatDeleteAttendance(id, result);
    }

    hideLoadingView();
  }

  function treatAddAttendance(result: ServiceResponse<Attendance>) {
    if(result.err) {
      const canContinue = verifyPanicError(result.err);

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct();
      }
    } else if(result.data && attendances) {
      setAttendances([
        ...attendances,
        result.data
      ]);

      showToast('Tipo de Atendimento adicionado com sucesso.');
    }
  }

  function treatEditAttendance(result: ServiceResponse<Attendance>) {
    if(result.err) {
      const canContinue = verifyPanicError(result.err);

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct();
      }
    } else if(result.data) {
      fetchData();

      showToast('Tipo de Atendimento Editado com sucesso.');
    }
  }

  function treatDeleteAttendance(id: number, result: ServiceResponse<boolean>) {
    if(result.err) {
      const canContinue = verifyPanicError(result.err)

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct();
      }
    } else if(result.data) {
      fetchData();

      showToast('Tipo de Atendimento deletado com sucesso!');
    }
  }

  function onFinish(data: Attendance) {
    const canContinue = verifyData(data);

    if(!canContinue) {
      return; 
    }

    if(editAttendance) {
      handleEditAttendance(data);
    } else {
      handleAddAtendance(data);
    }

    if(modalRef.current) {
      modalRef.current.clearFields();

      setShowAddModal(false);
    }
  }

  function verifyData(data: Attendance) {
    let error: string = '';

    if(!data.title.length) {
      error = 'Você precisa inserir o nome do tipo de atendimento.';
    } else if(!data.services) {
      error = 'Você precisa adicionar ao menos um serviço!';
    } else {
      for(let i = 0 ; i < data.services.length; i++) {
        const service = data.services[i]

        if(!service.name.length) {
          error = `Você precisa inserir o nome do ${i + 1}º serviço.`;
        } else if(!service.price) {
          error = `Você precisa inserir o preço do ${i + 1}º serviço.`;
        } else if(!service.duration) {
          error = `Você precisa inserir a duração do ${i + 1}º serviço.`;
        }
      }
    }

    if(error.length) {
      showToast(error);
    }

    return error.length === 0;
  }

  function panicAct() {
    appHistory.push('/');
  }

  return (
    <BasePage
      pageTitle={pageTitle}
      mainButton={{
        title: 'Adicionar',
        onClick: handleShowAddModal
      }}
    >
      <AttendancesTable
        attendances={attendances}
        handleEdit={handleShowAddModalEditting}
        handleDelete={handleDeleteAttendance}
      />
      <AddAttendancesModal
        ref={modalRef}
        show={showAddModal}
        hide={hideAddModal}
        onFinish={onFinish}
        attendance={attendanceToEdit}
        edit={editAttendance}
      />
    </BasePage>
  );
}

export default AttendancesPage;
