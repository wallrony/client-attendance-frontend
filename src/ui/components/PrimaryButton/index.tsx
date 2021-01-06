import { Button } from 'antd';
import React from 'react';

import './styles.css';

interface PrimaryButtonProps {
  id?: string;
  onClick?: (event: React.MouseEvent) => void;
  type: "button" | "submit" | "reset" | undefined;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, id, onClick, type = 'button' }) => {
  return (
    <Button
      id={id}
      type="primary"
      onClick={onClick}
      htmlType={type}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
