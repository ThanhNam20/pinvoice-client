import { ProductDto } from "./../types/Product";
import axios from "axios";
import querystring from "querystring";

const getListProducts = (limit: number): any => {
  const config = {
    url: `v1/products/getProducts?limit=${limit}`,
    method: "get",
  };
  return axios(config);
};

const createNewProduct = (data: ProductDto): any => {
  const config = {
    url: `v1/products/createProduct`,
    method: "post",
    data: querystring.stringify({
      ...data,
    }),
  };
  return axios(config);
};

export const productService = {
  getListProducts,
  createNewProduct,
};
