import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import "./styles.css";
import Header from "../../components/Header";
import { Outlet, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <Header url={location.pathname}/>
      <Outlet />
    </>
  );
};

export default Home;
