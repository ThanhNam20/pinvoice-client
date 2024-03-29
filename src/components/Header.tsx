/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { localStorageService } from "services/localstorage.service";
import { useAppDispatch } from "store/hooks";
import { userActions } from "store/slices/userSlice";
import "./styles.css";

export interface IHeaderProps {
  url: string;
  isAuthenticated: boolean;
}

const HeaderComponent: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const { url, isAuthenticated } = props;
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const logout = () => {
    localStorageService.removeAll();
    dispatch(userActions.removeUserInfo);
    const win: Window = window;
    win.location = "/login";
  };

  return (
    <header className="sticky-header">
      <nav className="header-shadow bg-white py-2 md:py-4 ">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
            <NavLink to="/" className="font-bold text-xl text-indigo-600">
              PINVOICE
            </NavLink>
            <button
              className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
              id="navbar-toggle"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
            id="navbar-collapse"
          >
            <NavLink
              to="/"
              className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/search-invoice"
              className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              Tra cứu hoá đơn
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/admin/manage-invoice"
                  className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                >
                  Quản lý hoá đơn
                </NavLink>

                <NavLink
                  to="/login"
                  onClick={logout}
                  className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
                >
                  Đăng xuất
                </NavLink>
              </>
            )}

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
                >
                  Đăng nhập
                </NavLink>
                <NavLink
                  to="/register"
                  className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
                >
                  Đăng kí
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
