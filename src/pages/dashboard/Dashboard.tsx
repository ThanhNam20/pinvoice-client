import {
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Quản lý hoá đơn", "1", <UserOutlined />, [
    getItem("Danh sách hoá đơn", "2"),
    getItem("Thêm hoá đơn", "3"),
  ]),
  getItem("Quản lý hàng hoá", "4", <TeamOutlined />, [
    getItem("Danh sách hàng hoá", "5"),
    getItem("Thêm hàng hoá", "6"),
  ]),
];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const goToDashboardPage = (key: string) =>{
    let page = '';
    
    switch (key) {
      case "2":
        page = "/admin/manage-invoice";
        break;
      case "3":
        page = "/admin/add-invoice";
        break;
      case "5":
        page = "/admin/manage-product";
        break;
      case "6":
        page = "/admin/add-product";
        break;
      default:
        break;
    }
    navigate(page);
  }

  return (
    <Layout style={{ minHeight: "100vh", marginTop: "68px" }}>
      <Sider
        // collapsible
        // collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultOpenKeys={['1']}
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
          onSelect={(item) => {
            goToDashboardPage(item.key)
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: window.screen.height }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
