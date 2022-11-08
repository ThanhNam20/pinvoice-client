import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { invoiceService } from "services/invoice.service";
import { useAppSelector } from "store/hooks";
import { userSelector } from "store/slices/userSlice";
import { useAppDispatch } from "../store/hooks";

export interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const ReleaseInvoiceModal: React.FC<ModalProps> = (props: ModalProps) => {
  const { isModalOpen, setIsModalOpen } = props;
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
    console.log("Received values of form: ", values);
    const file = values.dragger[0].originFileObj;
    await invoiceService.releaseInvoice("636a87af634ab81519045764", file, '123123123123' );

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
