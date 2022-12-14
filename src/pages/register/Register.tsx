import React, { useState } from "react";
import "./styles.css";
import { authService } from "../../services/auth.service";
import { Field, useFormik } from "formik";
import { Divider, Form, Input, Spin } from "antd";
import { toast } from "react-toastify";
import { IRegister } from "types/Auth";
import { useAppDispatch } from "store/hooks";
import { userActions } from "../../store/slices/userSlice";
import ErrorMessage from "components/ErrorMessage";
import { registerValidation } from "./register.valdation";
import { RegisterDto } from "../../types/RegisterDto";
import { localStorageService } from "services/localstorage.service";
import { LOCALSTORAGE_KEY } from "contants/message";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: registerValidation,
    onSubmit: (values: RegisterDto) => {
      const { rePassword, ...registerValues } = values; // remove property
      register(registerValues);
    },
  });

  const register = async (registerDto: RegisterDto) => {
    try {
      setLoading(true);
      const registerData: any = await authService.register(registerDto);
      if (registerData) {
        const { message, data } = registerData;
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorageService.setItem(
          LOCALSTORAGE_KEY.ACCESS_TOKEN,
          data.tokens.access.token
        );
        localStorageService.setItem(
          LOCALSTORAGE_KEY.USER_DATA,
          JSON.stringify(data.user)
        );
        dispatch(userActions.getUserInfoSuccess(data.user));
        navigate("/home");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="example">
      <Spin size="large" spinning={loading}>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-blue-700">
              Register
            </h1>
            <form onSubmit={formik.handleSubmit} className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <Input
                  type="name"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.name && Boolean(formik.errors.name) && (
                  <ErrorMessage message={formik.errors.name as string} />
                )}
              </div>
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
                  Password
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

              <div className="mb-2">
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Rematch Password
                </label>
                <Input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.rePassword &&
                  Boolean(formik.errors.rePassword) && (
                    <ErrorMessage
                      message={formik.errors.rePassword as string}
                    />
                  )}
              </div>

              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forget Password?
              </a>
              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Register
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Register;
