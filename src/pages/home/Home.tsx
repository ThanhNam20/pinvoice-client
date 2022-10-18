import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { LOCALSTORAGE_KEY } from "contants/message";
import { useAppSelector } from "store/hooks";
import { userSelector } from "store/slices/userSlice";
import Footer from "components/Footer.component";

const Home: React.FC = () => {
  const userSelectorData = useAppSelector(userSelector);
  const userInfo = localStorage.getItem(LOCALSTORAGE_KEY.USER_DATA);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userInfo, userSelectorData]);

  const location = useLocation();
  return (
    <>
      <Header isAuthenticated={isAuthenticated} url={location.pathname} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
