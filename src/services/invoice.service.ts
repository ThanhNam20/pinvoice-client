import axios from "axios";

const getListInvoices = (limit: number, userId: string): any => {
  const config = {
    url: `v1/invoices/getInvoices?limit=${limit}&userId=${userId}`,
    method: "get",
  };
  return axios(config);
};

const getInvoiceById = (invoiceId: string, capchaCode: string): any => {
  const config = {
    url: `v1/invoices/getInvoice/${invoiceId}`,
    method: "post",
    data: {
      capchaCode,
    },
  };
  return axios(config);
};

const createNewInvoices = (data: any): any => {
  const config = {
    url: `v1/invoices/create-invoice`,
    method: "post",
    data,
  };
  return axios(config);
};

const seeInvoice = (id: string): any => {
  const config = {
    url: `v1/invoices/show-invoice/${id}`,
    method: "get",
  };
  return axios(config);
};

const sendInvoiceToClient =  (invoiceId: string): any => {
  const config = {
    url: `v1/invoices/send-invoice`,
    method: "post",
    data: {
      invoiceId
    },
  };
  return axios(config);
};

const releaseInvoice = (
  id: string,
  file: File,
  clientCertificatePassword: string
): any => {
  const formData = new FormData();
  formData.append("invoiceId", id);
  formData.append("clientCertificatePassword", clientCertificatePassword);
  formData.append("file", file);
  const config = {
    url: `v1/invoices/export-invoice`,
    method: "post",
    data: formData,
  };
  return axios(config);
};

export const invoiceService = {
  getListInvoices,
  createNewInvoices,
  seeInvoice,
  releaseInvoice,
  getInvoiceById,
  sendInvoiceToClient
};
