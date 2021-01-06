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

  const [selectedRoute, setSelectedRoute] = useState<number>(0);

  const Sider = Layout.Sider;

  function handleSelectItem(index: number) {
    setSelectedRoute(index);

    appHistory.push(routes[index].path);
  }

  if(!routes.map(item => item.path).includes(appHistory.location.pathname)) {
    appHistory.push(routes[0].path);
  }

  return (
    <Sider
      collapsible
      width={200}
      className="site-layout-background"
      id="app-side-bar"
      >
      <Menu
        inlineCollapsed
        defaultSelectedKeys={[`nav-menu-${appHistory.location.pathname}`]}
        mode="inline"
        style={{ borderRight: 0, height: '100%' }}
      >
        {
          routes.map(
            (item, index) =>
            <Menu.Item
              isSelected={selectedRoute === index}
              onClick={() => handleSelectItem(index)}
              key={`nav-menu-${item.path}`}
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
