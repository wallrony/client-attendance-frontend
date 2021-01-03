import { Button } from 'antd';
import React from 'react';

import './styles.css';

interface PrimaryButtonProps {
  onClick?: (event: React.MouseEvent) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick }) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
