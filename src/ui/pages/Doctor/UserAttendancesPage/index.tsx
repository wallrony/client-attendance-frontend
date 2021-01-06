import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppPage from '../../../../core/models/AppPage';
import UserAttendance from '../../../../core/models/UserAttendance';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../../core/utils/ToastUtils';
import UserAttendancesService from '../../../../services/UserAttendancesService';
import BasePage from '../../../components/BasePage';
import FinalizeUserAttendancesModal from '../../../components/FinalizeUserAttendanceModal';
import UserAttendancesTable from '../../../components/UserAttendancesTable';

const FinalizeUserAttendancesPage: React.FC<AppPage> = ({ pageTitle, browserProps, verifyPanicError }) => {
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
        appHistory.push('/');
      }
    } else {
      setUserAttendances(result.data);
    }
  }
  
  function handleDoctorView(attendance: UserAttendance | undefined) {
    setSelectedAttendance(attendance);

    setShowFinalizeAttendanceModal(true);
  }

  function handleHideModal() {
    setShowFinalizeAttendanceModal(false);

    setSelectedAttendance(undefined);
  }

  async function handleAddCommission() {
    showLoadingView();

    // const result = await CommissionsService.add();

    hideLoadingView();
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
        />
      }
    </BasePage>
  );
}

export default FinalizeUserAttendancesPage;
