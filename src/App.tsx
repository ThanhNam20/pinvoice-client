import React, { useEffect, useState } from "react";
import "./App.css";
import { Button } from "antd";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import Home from "pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "pages/login/Login";
import NotFound from "components/NotFound";
import Register from "./pages/register/Register";
import { userSelector } from "./store/slices/userSlice";
import { useAppSelector } from "store/hooks";
import { LOCALSTORAGE_KEY } from "./contants/message";
import SearchInvoice from './pages/search-invoice/SearchInvoice';

function App() {
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

  return (
    <>
      <Routes>
        <Route
          element={
            <PublicRoute isAuthenticated={isAuthenticated} to="/">
              <Login />
            </PublicRoute>
          }
          path="/login"
        />
        <Route
          element={
            <PublicRoute isAuthenticated={isAuthenticated} to="/">
              <Register />
            </PublicRoute>
          }
          path="/register"
        />
        <Route
          element={
            <PublicRoute isAuthenticated={isAuthenticated} to="/">
              <Home />
            </PublicRoute>
          }
          path="/"
        >
          <Route
            element={
              <PublicRoute isAuthenticated={isAuthenticated} to="/">
                <SearchInvoice />
              </PublicRoute>
            }
            path="/search-invoice"
          />
        </Route>
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
