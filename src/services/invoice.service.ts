import axios from "axios";

const getListInvoices = (limit: number): any => {
  const config = {
    url: `v1/invoices/getInvoices?limit=${limit}`,
    method: "get",
  };
  return axios(config);
};

const createNewInvoices = (data: any): any => {
  const config = {
    url: `v1/invoices/create-invoice`,
    method: "post",
    data
  };
  return axios(config);
};

export const invoiceService = {
  getListInvoices,
  createNewInvoices,
};
