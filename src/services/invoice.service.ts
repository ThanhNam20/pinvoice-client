import { ProductDto } from "./../types/Product";
import axios from "axios";
import querystring from "querystring";

const getListInvoices = (limit: number): any => {
  const config = {
    url: `v1/invoices/getProducts?limit=${limit}`,
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
