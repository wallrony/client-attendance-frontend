import React from 'react';
import Commission from '../../../core/models/Commission';
import CommissionItem from '../CommissionItem';

import './styles.css';

interface CommissionsListProps {
  commissions: Commission[] | undefined;
  showCommissionsValue: boolean;
}

const CommissionList: React.FC<CommissionsListProps> = ({ commissions, showCommissionsValue }) => {
  if(!commissions) {
    return (
      <p>Carregando comissões.</p>
    )
  } if(!commissions.length) {
    return (
      <p>Nenhuma comissão foi encontrado.</p>
    );
  }

  return (
    <div id="commission-list">
      {commissions.map(item =>
        <CommissionItem
          commission={item}
          showValue={showCommissionsValue}
        />
      )}
    </div>
  );
}

export default CommissionList;
