import React from 'react';
import { Layout, Avatar, Menu } from 'antd';
import logo1 from '../assets/logo1.jpg'; 
import user from '../assets/userImage.png.png'
const { Header } = Layout;

const Navbar = ({ darkMode }) => {
  return (
    <Header className="navbar" style={{ backgroundColor: darkMode ? '#001529' : '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      
      <div className="logo">
        <img src={logo1} alt="Logo" style={{ height: '70px',marginTop:'20px',marginLeft:'10px' }} />  
      </div>
      
      <Menu  mode="horizontal">
        <Menu.Item key="1">
          <Avatar src={user} />
          KYC
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
