import { Form, Input, Spin } from "antd";
import ErrorMessage from "components/ErrorMessage";
import TableComponent from "components/Table.component";
import { PAGINATION } from "contants/const";
import { TOAST_MESSAGE } from "contants/message";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { invoiceService } from "services/invoice.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { invoicesActions } from "store/slices/invoiceSlice";
import { productsSelector } from "store/slices/productSlice";
import { userSelector } from "store/slices/userSlice";
import { IProduct } from "types/Product";
import { addInvoiceValidation } from "./AddInvoice.validation";

const AddInvoice: React.FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(userSelector);
  const productsState = useAppSelector(productsSelector);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listProductSelected, setListProductSelected] = useState<IProduct[]>(
    []
  );

  useEffect(() => {}, []);
  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerAddress: "",
      customerPhoneNumber: "",
      customerTextCode: "",
      paymentMethod: "",
      customerAccountNumber: "",
    },
    validationSchema: addInvoiceValidation,
    onSubmit: (values: any) => {
      onFinish(values);
    },
  });

  const getProductById = (id: string) => {
    const item = productsState.listProducts?.find((item) => item.id === id);
    return item;
  };

  const onSelectProduct = (selectItem: any) => {
    const item = getProductById(selectItem.target.value);
    const data = { ...item, productQuantity: "1" };
    setListProductSelected((prev): any => [...prev, data]);
  };

  const onFinish = async (values: any) => {
    const userId = userState.currentUser?.id;
    let totalPayment = "";
    listProductSelected.forEach((item) => {
      totalPayment += item.productPrice;
    });
    const submitData = {
      ...values,
      listProducts: listProductSelected,
      userId,
      totalPayment,
    };
    setLoading(true);
    try {
      const response = await invoiceService.createNewInvoices(submitData);
      if (response) {
        dispatch(invoicesActions.getListInvoices(PAGINATION.LIMIT));
        toast.success(TOAST_MESSAGE.CREATE_INVOICE_SUCCESSFULLY, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(TOAST_MESSAGE.SOME_THING_WENT_WRONG, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      formik.resetForm();
      setLoading(false);
      form.resetFields();
    }
  };

  interface MyCodeParams {
    listProductSelected: IProduct[];
  }

  return (
    <Spin size="large" spinning={loading}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Tên khách hàng
            </label>
            <Input
              type="text"
              id="customerName"
              onChange={formik.handleChange}
              value={formik.values.customerName}
              onBlur={formik.handleBlur}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Thanh"
            />
            {formik.touched.customerName &&
              Boolean(formik.errors.customerName) && (
                <ErrorMessage message={formik.errors.customerName as string} />
              )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Địa chỉ</label>
            <Input
              type="text"
              id="customerAddress"
              onChange={formik.handleChange}
              value={formik.values.customerAddress}
              onBlur={formik.handleBlur}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ha noi"
            />
            {formik.touched.customerAddress &&
              Boolean(formik.errors.customerAddress) && (
                <ErrorMessage
                  message={formik.errors.customerAddress as string}
                />
              )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Số điện thoại
            </label>
            <Input
              type="text"
              id="customerPhoneNumber"
              onChange={formik.handleChange}
              value={formik.values.customerPhoneNumber}
              onBlur={formik.handleBlur}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Number"
            />
            {formik.touched.customerPhoneNumber &&
              Boolean(formik.errors.customerPhoneNumber) && (
                <ErrorMessage
                  message={formik.errors.customerPhoneNumber as string}
                />
              )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Mã số thuế</label>
            <Input
              type="text"
              id="customerTextCode"
              onChange={formik.handleChange}
              value={formik.values.customerTextCode}
              onBlur={formik.handleBlur}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="09"
            />
            {formik.touched.customerTextCode &&
              Boolean(formik.errors.customerTextCode) && (
                <ErrorMessage
                  message={formik.errors.customerTextCode as string}
                />
              )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Số tài khoản
            </label>
            <Input
              type="text"
              id="customerAccountNumber"
              onChange={formik.handleChange}
              value={formik.values.customerAccountNumber}
              onBlur={formik.handleBlur}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
            {formik.touched.customerAccountNumber &&
              Boolean(formik.errors.customerAccountNumber) && (
                <ErrorMessage
                  message={formik.errors.customerAccountNumber as string}
                />
              )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Hình thức thanh toán
            </label>
            <Input
              type="text"
              id="paymentMethod"
              onChange={formik.handleChange}
              value={formik.values.paymentMethod}
              onBlur={formik.handleBlur}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
            {formik.touched.paymentMethod &&
              Boolean(formik.errors.paymentMethod) && (
                <ErrorMessage message={formik.errors.paymentMethod as string} />
              )}
          </div>
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Chọn hàng hoá
        </label>
        <select
          onChange={onSelectProduct}
          className="mb-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Danh sách sản phẩm</option>
          {productsState.listProducts &&
            productsState.listProducts.map((item: IProduct) => (
              <option key={item.id} value={item.id}>
                {item.productName}
              </option>
            ))}
        </select>

        {listProductSelected && listProductSelected.length > 0 && (
          <TableComponent
            setListProductSelected={setListProductSelected}
            listProductSelected={listProductSelected}
          />
        )}
        <button
          type="submit"
          className="text-white mt-9 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Tạo hoá đơn
        </button>
      </form>
    </Spin>
  );
};

export default AddInvoice;
