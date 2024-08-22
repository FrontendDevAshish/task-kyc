import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const Sidebar = ({ darkMode }) => {
    const location = useLocation();
  return (
    <Sider width={200} className="site-layout-background">
      <Menu theme={darkMode ? 'dark' : 'light'} mode="inline" selectedKeys={[location.pathname]} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1">
          <Link to="/">Product Details</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/compare">Compare Products</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
