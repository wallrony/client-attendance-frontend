import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppPage from '../../../../core/models/AppPage';
import Commission from '../../../../core/models/Commission';
import ServiceResponse from '../../../../core/models/ServiceResponse';
import UserAttendance from '../../../../core/models/UserAttendance';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../../core/utils/ToastUtils';
import CommissionsService from '../../../../services/CommissionsService';
import UserAttendancesService from '../../../../services/UserAttendancesService';
import BasePage from '../../../components/BasePage';
import FinalizeUserAttendancesModal from '../../../components/FinalizeUserAttendanceModal';
import UserAttendancesTable from '../../../components/UserAttendancesTable';

const DoctorAttendancesPage: React.FC<AppPage> = ({ pageTitle, browserProps, verifyPanicError }) => {
  const appHistory = useHistory();

  const [selectedAttendance, setSelectedAttendance] = useState<UserAttendance>()

  const [userAttendances, setUserAttendances] = useState<UserAttendance[]>();
  const [
    showFinalizeAttendanceModal, setShowFinalizeAttendanceModal
  ] = useState<boolean>(false)

  useEffect(() => {
    fetchUserAttendances();

    // eslint-disable-next-line
  }, []);

  async function fetchUserAttendances() {
    const result = await UserAttendancesService.indexAll();

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

  function panicAct() {
    appHistory.push('/');
  }
  
  function handleDoctorView(attendance: UserAttendance | undefined) {
    setSelectedAttendance(attendance);

    setShowFinalizeAttendanceModal(true);
  }

  function handleHideModal() {
    setShowFinalizeAttendanceModal(false);

    setSelectedAttendance(undefined);
  }

  async function handleAddCommission(commission: Commission | undefined): Promise<boolean> {
    if(!commission) {
      return false;
    }

    showLoadingView();

    const result = await CommissionsService.add(commission);

    hideLoadingView();

    return treatHandleAddCommission(result);
  }

  function treatHandleAddCommission(result: ServiceResponse<Commission>) {
    if(result.err) {
      const canContinue = verifyPanicError(result.err);

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct();
      }

      setShowFinalizeAttendanceModal(false);

      return false;
    } else {
      fetchUserAttendances();

      return true;
    }
  }

  async function initiateAttendance(data: UserAttendance): Promise<boolean> {
    let canContinue: boolean = false;

    showLoadingView();

    let services: number[] = [];

    if(data?.services) {
      services = data?.services.map(item => item.id ? item.id : 0)
        .filter(item => item !== 0) ?? [];
      
      data['status'] = 'in-progress';

      const result = await UserAttendancesService.update(data, services);

      canContinue = treatHandleModalOk(result);
    }

    hideLoadingView();

    return canContinue;
  }

  function treatHandleModalOk(result: ServiceResponse<UserAttendance>) {
    if(result.err) {
      const canContinue = verifyPanicError(result.err);

      if(canContinue) {
        showToast(result.err);
      } else {
        panicAct();
      }
    } else {
      setSelectedAttendance(result.data);

      return true;
    }

    return false;
  }

  let content;

  if(!userAttendances) {
    content = <p>Carregando seus atendimentos...</p>
  } else if(!userAttendances.length) {
    content = <p>Não há nenhum atendimento agendado.</p>
  } else {
    content = <UserAttendancesTable
      handleDelete={() => {}}
      userAttendances={userAttendances}
      doctorView
      handleDoctorView={handleDoctorView}
    />;
  }

  return (
    <BasePage pageTitle={pageTitle}>
      {content}
      {
        selectedAttendance && <FinalizeUserAttendancesModal
          show={showFinalizeAttendanceModal}
          attendance={selectedAttendance}
          hide={handleHideModal}
          panic={verifyPanicError}
          onFinish={handleAddCommission}
          initiateAttendance={initiateAttendance}
        />
      }
    </BasePage>
  );
}

export default DoctorAttendancesPage;
