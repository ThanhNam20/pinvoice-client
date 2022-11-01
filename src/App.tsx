import NotFound from "components/NotFound";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import AddInvoice from "pages/add-invoice/AddInvoice";
import AddProduct from "pages/add-product/AddProduct";
import Home from "pages/home/Home";
import Login from "pages/login/Login";
import ManageInvoice from "pages/manage-invoice/ManageInvoice";
import ManageProduct from "pages/manage-product/ManageProduct";
import Template from "pages/template/Template";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import "./App.css";
import { LOCALSTORAGE_KEY } from "./contants/message";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import SearchInvoice from "./pages/search-invoice/SearchInvoice";
import { userSelector } from "./store/slices/userSlice";

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
          path="login"
        />
        <Route
          element={
            <PublicRoute isAuthenticated={isAuthenticated} to="/">
              <Register />
            </PublicRoute>
          }
          path="register"
        />
        <Route element={<Home />} path="/">
          <Route element={<SearchInvoice />} path="search-invoice" />
          <Route element={<Template />} index />
          <Route
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
            path="admin"
          >
            <Route element={<ManageInvoice />} path="manage-invoice" />
            <Route element={<AddProduct />} path="add-product" />
            <Route element={<ManageProduct />} path="manage-product" />
            <Route element={<AddInvoice />} path="add-invoice" />
          </Route>
        </Route>

        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
