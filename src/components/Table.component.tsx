import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { IProduct } from "types/Product";

type TableProps = {
  listProductSelected: IProduct[];
  setListProductSelected: (listProductSelected: IProduct[]) => any;
};

const originData: IProduct[] = [];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IProduct;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableComponent = (props: TableProps) => {
  let { listProductSelected, setListProductSelected } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey]: any = useState("");
  const isEditing = (record: IProduct) => record.id === editingKey;

  useEffect(() => {
    setData(listProductSelected);
  }, [props]);

  const edit = (record: Partial<IProduct> & { key: React.Key }) => {
    form.setFieldsValue({
      productName: "",
      productQuantity: "",
      productUnit: "",
      productPrice: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as IProduct;
      const newData = [...listProductSelected];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setListProductSelected(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setListProductSelected(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "productName",
      dataIndex: "productName",
      width: "25%",
      editable: true,
    },
    {
      title: "productQuantity",
      dataIndex: "productQuantity",
      width: "15%",
      editable: true,
    },
    {
      title: "productUnit",
      dataIndex: "productUnit",
      width: "20%",
      editable: true,
    },
    {
      title: "productPrice",
      dataIndex: "productPrice",
      width: "20%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: IProduct) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IProduct) => ({
        record,
        inputType: col.dataIndex === "productQuantity" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TableComponent;
