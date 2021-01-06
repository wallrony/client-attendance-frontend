import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import AppLogo from '../AppLogo';

import './styles.css';
import User from '../../../core/models/User';

interface AppHeaderProps {
  user: User | undefined;
  signOut: (event: React.MouseEvent) => void;
}

const AppHeader = ({ user, signOut }: AppHeaderProps) => {
  let userInfo: JSX.Element = <div></div>;

  if(user) {
    userInfo = (
      <div className="user-info">
        <p>Olá, {user.name}!</p>
        <Button icon={<LogoutOutlined />} onClick={signOut}>Sair</Button>
      </div>
    );
  }

  return (
    <header id="app-header">
      <AppLogo />
      { userInfo }
    </header>
  );
}

export default AppHeader;
