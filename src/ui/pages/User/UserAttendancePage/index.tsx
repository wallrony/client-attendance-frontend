import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppPage from '../../../../core/models/AppPage';
import ServiceResponse from '../../../../core/models/ServiceResponse';
import UserAttendance from '../../../../core/models/UserAttendance';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../../core/utils/ToastUtils';
import UserAttendancesService from '../../../../services/UserAttendancesService';
import AddUserAttendanceModal, { AddUserAttendancesModalHandlers } from '../../../components/AddUserAttendanceModal';
import BasePage from '../../../components/BasePage';
import UserAttendancesTable from '../../../components/UserAttendancesTable';

const UserAttendancePage: React.FC<AppPage> = ({ pageTitle, browserProps, verifyPanicError }) => {
  const appHistory = useHistory();

  const modalRef = React.createRef<AddUserAttendancesModalHandlers>();

  const [userAttendances, setUserAttendances] = useState<UserAttendance[]>();
  const [
    showScheduleAttendanceModal, setShowScheduleAttendanceModal
  ] = useState<boolean>(false)

  useEffect(() => {
    fetchUserAttendances();

    // eslint-disable-next-line
  }, []);
  
  async function fetchUserAttendances() {
    const result = await UserAttendancesService.index(Number(browserProps?.user.id));

    if(result.err) {
      const canContinue = verifyPanicError(result.err);

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct();
      }
    } else {
      setUserAttendances(result.data);
    }
  }
  
  async function handleDelete(id: number) {
    showLoadingView();
    
    const result = await UserAttendancesService.delete(id);
    
    treatDeleteUserAttendance(result);

    hideLoadingView();
  }

  function treatDeleteUserAttendance(result: ServiceResponse<boolean>) {
    if(result.err) {
      showToast(result.err);
    } else if(result.data) {
      fetchUserAttendances();

      showToast('Atendimento deletado com sucesso.');
    }
  }

  function panicAct() {
    appHistory.push('/');
  }

  function handleHideModal() {
    setShowScheduleAttendanceModal(false);

    modalRef.current?.clearFields();
  }

  async function handleAdd(data: UserAttendance | undefined) {
    if(data && data.services) {
      const services: number[] = [];

      for(const item of data.services) {
        services.push(Number(item.id));
      }

      showLoadingView();

      const result = await UserAttendancesService.add(data, services);

      const canContinue = treatHandleAdd(result);

      if(canContinue) {
        await fetchUserAttendances();
      }

      hideLoadingView();
    }
  }

  function treatHandleAdd(result: ServiceResponse<UserAttendance>): boolean {
    if(result.err) {
      const canContinue = verifyPanicError(result.err);

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct();
      }

      return false;
    } else {
      showToast('Atendimento agendado!');

      handleHideModal();

      return true;
    }
  }
  
  let content;

  if(!userAttendances) {
    content = <p>Carregando seus atendimentos...</p>
  } else if(!userAttendances.length) {
    content = <p>Não há nenhum atendimento agendado.</p>
  } else {
    content = <UserAttendancesTable
      handleDelete={id => handleDelete(Number(id))}
      userAttendances={userAttendances}
    />;
  }

  return (
    <BasePage
      pageTitle={pageTitle}
      mainButton={{
        title: 'Adicionar',
        onClick: () => setShowScheduleAttendanceModal(true)
      }}
    >
      {content}
      <AddUserAttendanceModal
        ref={modalRef}
        show={showScheduleAttendanceModal}
        hide={handleHideModal}
        onFinish={handleAdd}
        panic={verifyPanicError}
      />
    </BasePage>
  )
}

export default UserAttendancePage;
