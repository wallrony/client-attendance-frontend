import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppPage from '../../../../core/models/AppPage';
import Commission from '../../../../core/models/Commission';
import { hideLoadingView, showLoadingView } from '../../../../core/utils/LoadingViewUtils';
import { showToast } from '../../../../core/utils/ToastUtils';
import CommissionsService from '../../../../services/CommissionsService';
import BasePage from '../../../components/BasePage';
import CommissionList from '../../../components/CommissionList';

const CommissionsPage: React.FC<AppPage> = ({ pageTitle, verifyPanicError }) => {
  const appHistory = useHistory();

  const [commissions, setCommissions] = useState<Commission[]>();
  const [showCommissionsValue, setShowCommissionsValue] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCommissions() {
      showLoadingView();

      const result = await CommissionsService.index();

      if(result.err) {
        const canContinue = verifyPanicError(result.err);

        if(canContinue) {
          showToast(result.err);
        } else {
          panicAct();
        }
      } else {
        setCommissions(result.data);
      }

      hideLoadingView();
    }

    fetchCommissions();

    // eslint-disable-next-line
  }, []);

  function panicAct() {
    appHistory.push('/');
  }

  const commissionList = (
    <CommissionList
      commissions={commissions}
      showCommissionsValue={showCommissionsValue}
    />
  );

  return (
    <BasePage pageTitle={pageTitle} mainButton={{
      title: `${
        showCommissionsValue ? 'Esconder Valor' : 'Mostrar Valor'
      }`,
      onClick: () => setShowCommissionsValue(!showCommissionsValue)
    }}>
      { commissionList }
    </BasePage>
  );
}

export default CommissionsPage;
