import { Button, Col, Input, Modal, Row, Spin } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LOCALSTORAGE_KEY, TOAST_MESSAGE } from "contants/message";
import { profileUserValidation } from "pages/update-profile/profile-user.validation";
import { useFormik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { useAppDispatch } from "../store/hooks";
import { useAppSelector } from "store/hooks";
import { userSelector } from "store/slices/userSlice";
import { userService } from "../services/user.service";
import { userActions } from "../store/slices/userSlice";
import { localStorageService } from "services/localstorage.service";

export interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export interface UpdateUserProps {
  commonName: string;
  organizationalUnitName: string;
  organizationName: string;
  localityName: string;
  stateOrProvinceName: string;
  countryName: string;
  phoneNumber: string;
  textCode: string;
  address: string;
  accountNumber: string;
}

const ModalComponent: React.FC<ModalProps> = (props: ModalProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  const dispatch = useAppDispatch();
  const userSelectorData = useAppSelector(userSelector);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      commonName: "",
      organizationalUnitName: "",
      organizationName: "",
      localityName: "",
      stateOrProvinceName: "",
      countryName: "",
      phoneNumber: "",
      textCode: "",
      address: "",
      accountNumber: "",
    },
    validationSchema: profileUserValidation,
    onSubmit: (values: UpdateUserProps) => {
      updateUserProfile(values);
    },
  });

  const updateUserProfile = async (userInfoData: UpdateUserProps) => {
    try {
      const userId = userSelectorData.currentUser?.id;
      setLoading(true);
      const userProfileData = await userService.updateUserInfo(
        userId as string,
        userInfoData
      );
      if (userProfileData) {
        dispatch(userActions.getUserInfoSuccess(userProfileData.data));
        localStorageService.setItem(
          LOCALSTORAGE_KEY.USER_DATA,
          JSON.stringify(userProfileData.data)
        );
        toast.success(TOAST_MESSAGE.UPDATE_USER_INFO_SUCCESS, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsModalOpen(false);
        navigate("/admin/manage-invoice");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    toast.warning(TOAST_MESSAGE.USER_NOT_VERIFIED, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/login");
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setLoading(true);
  };

  const bodyStyle: React.CSSProperties = {
    overflowY: "auto",
    maxHeight: "75vh",
  };

  return (
    <>
      <Modal
        title="Khởi tạo thông tin khách hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        style={{ top: 30 }}
        bodyStyle={bodyStyle}
        footer={<Button onClick={handleCancel}>Cancel</Button>}
      >
        <Spin size="default" spinning={loading}>
          <form onSubmit={formik.handleSubmit}>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="commonName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Tên
                  </label>
                  <Input
                    type="commonName"
                    id="commonName"
                    name="commonName"
                    onChange={formik.handleChange}
                    value={formik.values.commonName}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.commonName &&
                    Boolean(formik.errors.commonName) && (
                      <ErrorMessage
                        message={formik.errors.commonName as string}
                      />
                    )}
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="organizationalUnitName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Bộ phận
                  </label>
                  <Input
                    type="organizationalUnitName"
                    id="organizationalUnitName"
                    name="organizationalUnitName"
                    onChange={formik.handleChange}
                    value={formik.values.organizationalUnitName}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.organizationalUnitName &&
                    Boolean(formik.errors.organizationalUnitName) && (
                      <ErrorMessage
                        message={formik.errors.organizationalUnitName as string}
                      />
                    )}
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="organizationName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Tổ chức
                  </label>
                  <Input
                    type="organizationName"
                    id="organizationName"
                    name="organizationName"
                    onChange={formik.handleChange}
                    value={formik.values.organizationName}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.organizationName &&
                    Boolean(formik.errors.organizationName) && (
                      <ErrorMessage
                        message={formik.errors.organizationName as string}
                      />
                    )}
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="localityName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Phường
                  </label>
                  <Input
                    type="localityName"
                    id="localityName"
                    name="localityName"
                    onChange={formik.handleChange}
                    value={formik.values.localityName}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.localityName &&
                    Boolean(formik.errors.localityName) && (
                      <ErrorMessage
                        message={formik.errors.localityName as string}
                      />
                    )}
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="stateOrProvinceName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Quận, huyện
                  </label>
                  <Input
                    type="stateOrProvinceName"
                    id="stateOrProvinceName"
                    name="stateOrProvinceName"
                    onChange={formik.handleChange}
                    value={formik.values.stateOrProvinceName}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.stateOrProvinceName &&
                    Boolean(formik.errors.stateOrProvinceName) && (
                      <ErrorMessage
                        message={formik.errors.stateOrProvinceName as string}
                      />
                    )}
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="countryName"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Quốc Gia
                  </label>
                  <Input
                    type="countryName"
                    id="countryName"
                    name="countryName"
                    onChange={formik.handleChange}
                    value={formik.values.countryName}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.countryName &&
                    Boolean(formik.errors.countryName) && (
                      <ErrorMessage
                        message={formik.errors.countryName as string}
                      />
                    )}
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Số điện thoại
                  </label>
                  <Input
                    type="phoneNumber"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber) && (
                      <ErrorMessage
                        message={formik.errors.phoneNumber as string}
                      />
                    )}
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="textCode"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Mã số thuế
                  </label>
                  <Input
                    type="textCode"
                    id="textCode"
                    name="textCode"
                    onChange={formik.handleChange}
                    value={formik.values.textCode}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.textCode &&
                    Boolean(formik.errors.textCode) && (
                      <ErrorMessage
                        message={formik.errors.textCode as string}
                      />
                    )}
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Địa chỉ
                  </label>
                  <Input
                    type="address"
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.address && Boolean(formik.errors.address) && (
                    <ErrorMessage message={formik.errors.address as string} />
                  )}
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="mb-2">
                  <label
                    htmlFor="accountNumber"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Số tài khoản
                  </label>
                  <Input
                    type="accountNumber"
                    id="accountNumber"
                    name="accountNumber"
                    onChange={formik.handleChange}
                    value={formik.values.accountNumber}
                    onBlur={formik.handleBlur}
                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.accountNumber &&
                    Boolean(formik.errors.accountNumber) && (
                      <ErrorMessage
                        message={formik.errors.accountNumber as string}
                      />
                    )}
                </div>
              </Col>
            </Row>
            <div className="mt-6 flex justify-center">
              <button className="w-1/2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Cập nhật
              </button>
            </div>
          </form>
        </Spin>
      </Modal>
    </>
  );
};

export default ModalComponent;
