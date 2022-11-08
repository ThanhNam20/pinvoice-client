import TableComponent from "components/Table.component";
import { useState } from "react";
import { useAppSelector } from "store/hooks";
import { productsSelector } from "store/slices/productSlice";
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
