import { Layout } from 'antd';
import Sidebar from 'components/SideBar.component'
import AddProduct from 'pages/add-product/AddProduct'
import React from 'react'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='flex align-items-center'>
      <Sidebar />
      <div className='ml-8 mt-24'>
        <Outlet/>
      </div>
    </div>
  );
}

export default Dashboard