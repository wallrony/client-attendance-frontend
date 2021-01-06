import React from 'react';
import Commission from '../../../core/models/Commission';
import { formatDate } from '../../../core/utils/DateUtils';

import './styles.css'

interface CommissionItemProps {
  commission: Commission;
  showValue: boolean;
}

const CommissionItem: React.FC<CommissionItemProps> = ({ commission, showValue }) => (
  <div className="commission-item">
    <h2 className="commission-title">{commission.title}</h2>
    <p className="commission-date">Data: {formatDate(commission.date)}</p>
    <p className={`commission-value${!showValue ? ' hide-value' : ''}`}>
      {
        showValue ? `Valor: R$${commission.value}` : ''
      }
    </p>
  </div>
);

export default CommissionItem;
