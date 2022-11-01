import { PAGINATION } from "contants/const";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { productsActions, productsSelector } from "store/slices/productSlice";

const ManageProduct = () => {
  const dispatch = useAppDispatch();  
  useEffect(() => {
    dispatch(productsActions.getListProducts(PAGINATION.LIMIT));
  }, []);

  return <div>ManageProduct</div>;
};

export default ManageProduct;
