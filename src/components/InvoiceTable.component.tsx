import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { TOAST_MESSAGE } from "contants/message";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { invoiceService } from "services/invoice.service";
import { Invoice } from "types/Invoice";
import ReleaseInvoiceModal from "./ReleaseInvoiceModal.component";

type InvoiceTableProps = {
  listInvoices: Invoice[];
};

const originData: Invoice[] = [];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Invoice;
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

const InvoiceTableComponent = (props: InvoiceTableProps) => {
  const { listInvoices } = props;

  const [form] = Form.useForm();
  const [data, setData] = useState<Invoice[]>(originData);
  const [editingKey, setEditingKey]: any = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEditing = (record: Invoice) => record.id === editingKey;
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>(
    listInvoices[0]
  );

  useEffect(() => { }, [props]);

  const edit = (record: Partial<Invoice> & { id: React.Key }) => {
    form.setFieldsValue({
      indexNumber: "",
      invoiceNumber: "",
      customerName: "",
      createdDate: "",
      releaseDate: "",
      releaseStatus: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const seeInvoice = async (invoice: Invoice) => {
    if (invoice.isRelease) {
      window.open(
        `${process.env.REACT_APP_BASE_URL}/v1/invoices/show-invoice-with-sign/${invoice.id}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.open(
        `${process.env.REACT_APP_BASE_URL}/v1/invoices/show-invoice/${invoice.id}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const sendInvoice = async (invoice: Invoice) => {
    try {
      const response = await invoiceService.sendInvoiceToClient(
        invoice.id
      );
      if (response) {
        toast.success(TOAST_MESSAGE.SEND_INVOICE_TO_CLIENT, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(TOAST_MESSAGE.SOME_THING_WENT_WRONG, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally { }
  }

  const releaseInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
    return <></>;
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as Invoice;
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "indexNumber",
      width: "10%",
      editable: true,
    },
    {
      title: "Số hoá đơn",
      dataIndex: "invoiceNumber",
      width: "15%",
      editable: false,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      width: "15%",
      editable: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      width: "15%",
      editable: false,
    },
    {
      title: "Ngày phát hành",
      dataIndex: "releaseDate",
      width: "15%",
      editable: false,
    },
    {
      title: "Trạng thái",
      dataIndex: "releaseStatus",
      width: "10%",
      editable: false,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      render: (_: any, record: Invoice) => {
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
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => seeInvoice(record)}
              style={{ paddingRight: 10 }}
            >
              Xem
            </Typography.Link>

            {record.isRelease && (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => sendInvoice(record)}
                style={{ paddingRight: 10 }}
              >
                Gửi khách hàng
              </Typography.Link>
            )}

            {!record.isRelease && (
              <>
                {/* <Typography.Link
                  disabled={editingKey !== ""}
                  onClick={() => edit(record)}
                  style={{ paddingRight: 10 }}
                >
                  Chỉnh sửa
                </Typography.Link> */}
                <Typography.Link
                  disabled={editingKey !== ""}
                  onClick={() => releaseInvoice(record)}
                >
                  Phát hành
                </Typography.Link>
              </>
            )}
          </>
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
      onCell: (record: Invoice) => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={listInvoices}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <ReleaseInvoiceModal
        selectedInvoice={selectedInvoice}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default InvoiceTableComponent;
