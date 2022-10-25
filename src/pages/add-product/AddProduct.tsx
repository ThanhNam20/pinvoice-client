import { Spin, Row, Col, Input } from 'antd';
import { ErrorMessage } from 'formik';
import React, { useState } from 'react'
import { useAppDispatch } from 'store/hooks';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
  return (
    <Spin size="default" spinning={loading}>
      <form>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="commonName"
                className="block text-sm font-semibold text-gray-800"
              >
                Common Name
              </label>
              <Input
                type="commonName"
                id="commonName"
                name="commonName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="mb-2">
              <label
                htmlFor="organizationalUnitName"
                className="block text-sm font-semibold text-gray-800"
              >
                OrganizationalUnit
              </label>
              <Input
                type="organizationalUnitName"
                id="organizationalUnitName"
                name="organizationalUnitName"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
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
  );
}

export default AddProduct;