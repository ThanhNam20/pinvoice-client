import { Button, Col, Form, Input, Row, Spin } from "antd";
import { PAGINATION } from "contants/const";
import { TOAST_MESSAGE } from "contants/message";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { productService } from "services/product.service";
import { useAppDispatch } from "store/hooks";
import { productsActions } from "store/slices/productSlice";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const AddProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await productService.createNewProduct(values);
      dispatch(productsActions.getListProducts(PAGINATION.LIMIT));
      toast.success(TOAST_MESSAGE.CREATE_PRODUCT_SUCCESSFULLY, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(TOAST_MESSAGE.SOME_THING_WENT_WRONG, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Spin size="large" spinning={loading}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <p style={{ fontSize: 32, fontWeight: 500, paddingBottom: 20 }}>
          Thêm hàng hoá
        </p>
        <Row gutter={2}>
          <Col span={12}>
            <Form.Item
              name="productName"
              label="Tên hàng hoá"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={2}>
          <Col span={12}>
            <Form.Item
              name="productQuantity"
              label="Số lượng hàng hoá"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={2}>
          <Col span={12}>
            <Form.Item
              name="productUnit"
              label="Đơn vị"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={2}>
          <Col span={12}>
            <Form.Item
              name="productPrice"
              label="Giá hàng hoá"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-6 flex justify-center">
          <button className="w-1/3 px-4 py-2  tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Thêm hàng hoá
          </button>
        </div>
      </Form>
    </Spin>
  );
};

export default AddProduct;
