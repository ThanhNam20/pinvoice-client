import { Input, message, Spin } from "antd";
import ErrorMessage from "components/ErrorMessage";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { searchValidation } from "./search.validation";
import "./styles.css";
import ReCAPTCHA from "react-google-recaptcha";
import { invoiceService } from "services/invoice.service";
import { Invoice } from "types/Invoice";
import { toast } from "react-toastify";
import { TOAST_MESSAGE } from "contants/message";
import InvoiceTableComponent from "components/InvoiceTable.component";

interface ISearch {
  invoiceId: string;
}

const SearchInvoice = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice[]>([]);

  const recaptchaRef: any = React.createRef();

  const initListInvoices = (data: Invoice[]) => {
    return data.map((item, index) => ({
      ...item,
      indexNumber: index + 1,
      releaseStatus: item.isRelease ? "Đã phát hành" : "Chưa phát hành",
    }));
  };

  const onSubmit = async (values: ISearch) => {
    setLoading(true);
    let listInvoices = [];
    const recaptchaValue = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();
    try {
      const responses = await invoiceService.getInvoiceById(
        values.invoiceId,
        recaptchaValue
      );
      if (responses) {
        listInvoices.push(responses.data);
        const invoiceData = initListInvoices(listInvoices);
        setSelectedInvoice(invoiceData);
        console.log(invoiceData);
        
        toast.success(responses.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(TOAST_MESSAGE.SOME_THING_WENT_WRONG, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      invoiceId: "",
    },
    validationSchema: searchValidation,
    onSubmit: (values: ISearch) => {
      onSubmit(values);
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
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                  />
                </div>

                {/* <div className="mb-2">
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
                </div> */}

                <div className="mt-6">
                  <button className="w-32 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-10">
              {selectedInvoice && selectedInvoice.length !== 0 && (
                <InvoiceTableComponent listInvoices={selectedInvoice} />
              )}
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default SearchInvoice;
