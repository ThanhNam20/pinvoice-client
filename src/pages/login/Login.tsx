import { Input, Spin } from "antd";
import ErrorMessage from "components/ErrorMessage";
import ModalComponent from "components/Modal.component";
import SEOComponent from "components/SEO.component";
import { STATIC_PAGE_SEO } from "contants/const";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { localStorageService } from "services/localstorage.service";
import { useAppDispatch } from "store/hooks";
import { LoginDto } from "types/LoginDto";
import { LOCALSTORAGE_KEY } from "../../contants/message";
import { authService } from "../../services/auth.service";
import { userActions } from "../../store/slices/userSlice";
import { signInValidation } from "./login.validation";
import "./styles.css";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidation,
    onSubmit: (values: LoginDto) => {
      login(values);
    },
  });

  const login = async (loginDto: LoginDto) => {
    try {
      setLoading(true);
      const loginData: any = await authService.login(loginDto);
      if (loginData) {
        const { message, data } = loginData;
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorageService.setItem(
          LOCALSTORAGE_KEY.ACCESS_TOKEN,
          data.tokens.access.token
        );

        if (!data.user.isInformationVerified) {
          dispatch(userActions.getUserInfoSuccessWithNoAuthentication(data.user));
          showModalUpdateUserProfile();
        } else {
          localStorageService.setItem(
            LOCALSTORAGE_KEY.USER_DATA,
            JSON.stringify(data.user)
          );
          dispatch(userActions.getUserInfoSuccess(data.user));
          navigate("/admin/manage-invoice");
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const showModalUpdateUserProfile = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
          <SEOComponent {...STATIC_PAGE_SEO.LOGIN}/>
      <Spin size="large" spinning={loading}>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-blue-700">
              Đăng nhập
            </h1>
            <form onSubmit={formik.handleSubmit} className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.email && Boolean(formik.errors.email) && (
                  <ErrorMessage message={formik.errors.email as string} />
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Mật khẩu
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.password && Boolean(formik.errors.password) && (
                  <ErrorMessage message={formik.errors.password as string} />
                )}
              </div>
              <NavLink to="#" className="text-xs text-blue-600 hover:underline">
                Quên mật khẩu
              </NavLink>
              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Đăng nhập
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Chưa có tài khoản?{" "}
              <NavLink
                to="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Đăng kí
              </NavLink>
            </p>
          </div>
        </div>
      </Spin>
      <ModalComponent
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default Login;
