import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  call, put,
  take,
  takeEvery
} from "redux-saga/effects";
import { productService } from "./../../services/product.service";
import { productsActions } from "./../slices/productSlice";

function* getListProducts() {
  // Listening to action, when action call, side effect will call

  const action: PayloadAction<any> = yield take(
    productsActions.getListProducts.type
  ); // Action type
  const response: AxiosResponse<any> = yield call(
    productService.getListProducts,
    action.payload
  );

  yield put(productsActions.getListProductsSuccess(response.data.results));
}

export default function* productsSaga() {
  yield takeEvery(
    productsActions.getListProducts.type.toString(),
    getListProducts
  );
}
