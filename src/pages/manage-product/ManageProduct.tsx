import { PAGINATION } from "contants/const";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { productsActions, productsSelector } from "store/slices/productSlice";
import React, { useState } from "react";
import TableComponent from "components/Table.component";
import { IProduct } from "types/Product";

const ManageProduct = () => {
  const productsState = useAppSelector(productsSelector);
  const [listProductSelected, setListProductSelected] = useState<IProduct[]>(
    []
  );
  return (
    <>
      <p className="">Quản lý sản phẩm</p>
      <TableComponent
        setListProductSelected={setListProductSelected}
        listProductSelected={productsState.listProducts}
      />
    </>
  );
};

export default ManageProduct;
