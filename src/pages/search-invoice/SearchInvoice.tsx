import { Input, Spin } from "antd";
import ErrorMessage from "components/ErrorMessage";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { searchValidation } from "./search.validation";
import "./styles.css";

interface ISearch {
  invoiceId: String;
  secretNumber: String;
}

const SearchInvoice = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      invoiceId: "",
      secretNumber: "",
    },
    validationSchema: searchValidation,
    onSubmit: (values: ISearch) => {
      console.log(values);
    },
  });

  return (
    <>
      <Spin size="large" spinning={loading}>
        <div className="container search-height">
          <div className="search-container">
            <p className="search-title">Tra cứu thông tin hoá đơn</p>
            <div className="form-container">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label
                    htmlFor="invoiceId"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Mã số hoá đơn *
                  </label>
                  <Input
                    type="invoiceId"
                    id="invoiceId"
                    name="invoiceId"
                    onChange={formik.handleChange}
                    value={formik.values.invoiceId}
                    onBlur={formik.handleBlur}
                    className="block w-1/3 px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.invoiceId &&
                    Boolean(formik.errors.invoiceId) && (
                      <ErrorMessage
                        message={formik.errors.invoiceId as string}
                      />
                    )}
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="secretNumber"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Mã số bí mật *
                  </label>
                  <Input
                    type="secretNumber"
                    id="secretNumber"
                    name="secretNumber"
                    onChange={formik.handleChange}
                    value={formik.values.secretNumber}
                    onBlur={formik.handleBlur}
                    className="block w-1/3 px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.secretNumber &&
                    Boolean(formik.errors.secretNumber) && (
                      <ErrorMessage
                        message={formik.errors.secretNumber as string}
                      />
                    )}
                </div>
                <div className="mt-6">
                  <button className="w-32 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="table-container"></div>
        </div>
      </Spin>
    </>
  );
};

export default SearchInvoice;
