import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  Upload,
} from "antd";
import { PAGINATION } from "contants/const";
import { LOCALSTORAGE_KEY, TOAST_MESSAGE } from "contants/message";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { invoiceService } from "services/invoice.service";
import { localStorageService } from "services/localstorage.service";
import { useAppSelector } from "store/hooks";
import { invoicesActions } from "store/slices/invoiceSlice";
import { userSelector } from "store/slices/userSlice";
import { Invoice } from "types/Invoice";
import { useAppDispatch } from "../store/hooks";

export interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  selectedInvoice: Invoice;
}

const ReleaseInvoiceModal: React.FC<ModalProps> = (props: ModalProps) => {
  const { isModalOpen, setIsModalOpen, selectedInvoice } = props;
  const dispatch = useAppDispatch();
  const userSelectorData = useAppSelector(userSelector);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setLoading(true);
  };

  const bodyStyle: React.CSSProperties = {
    overflowY: "auto",
    maxHeight: "75vh",
  };

  const { Option } = Select;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values: any) => {
    const file = values.dragger[0].originFileObj;
    try {
      const response = await invoiceService.releaseInvoice(
        selectedInvoice.id,
        file,
        values.clientCertificatePassword
      );
      if (response) {
        toast.success(TOAST_MESSAGE.SIGN_INVOICE_SUCCESSFULLY, {
          position: toast.POSITION.TOP_RIGHT,
        });
        const userInfo = JSON.parse(
          localStorageService.getItem(LOCALSTORAGE_KEY.USER_DATA)
        );
        dispatch(
          invoicesActions.getListInvoices({
            limit: PAGINATION.LIMIT,
            userId: userInfo.id,
          })
        );
      }
    } catch (error) {
    } finally {
      handleCancel();
    }
  };

  return (
    <>
      <Modal
        title="Phát hành hoá đơn"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        style={{ top: 30 }}
        bodyStyle={bodyStyle}
        footer={<Button onClick={handleCancel}>Cancel</Button>}
      >
        <Spin size="default" spinning={loading}>
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{}}
          >
            <Form.Item label="Chứng chỉ số">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger name="files" action="#">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <Form.Item
              label="Mật khẩu chứng chỉ số"
              name="clientCertificatePassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button
                style={{ color: "#393E46" }}
                type="primary"
                htmlType="submit"
              >
                Phát hành hoá đơn
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default ReleaseInvoiceModal;
