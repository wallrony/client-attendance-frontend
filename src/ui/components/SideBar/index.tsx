import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppRoute from '../../../core/models/AppRoute';

import './styles.css';

interface SideBarProps {
  routes: AppRoute[];
}

const SideBar: React.FC<SideBarProps> = ({ routes }) => {
  const appHistory = useHistory();

  const [selectedItem, setSelectedItem] = useState(routes[0].path);

  const Sider = Layout.Sider;

  function handleSelectItem(path: string) {
    setSelectedItem(path);

    appHistory.push(path);
  }

  return (
    <Sider
      collapsible
      width={200}
      className="site-layout-background"
      id="app-side-bar"
      color="var(--color-primary);"
      >
      <Menu
        inlineCollapsed
        defaultSelectedKeys={[`nav-menu-${routes[0].routeName}`]}
        mode="inline"
        style={{ borderRight: 0, height: '100%' }}
        color="var(--color-primary);"
      >
        {
          routes.map(
            (item) =>
            <Menu.Item
              isSelected={selectedItem === item.path}
              onClick={() => handleSelectItem(item.path)}
              key={`nav-menu-${item.routeName}`}
              icon={<item.icon />}
            >
              {item.routeName}
            </Menu.Item>
          )
        }
      </Menu>
    </Sider>
  );
}

export default SideBar;
