import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { invoiceService } from "services/invoice.service";
import { invoicesActions } from "store/slices/invoiceSlice";

function* getListInvoices() {
  // Listening to action, when action call, side effect will call
  const action: PayloadAction<any> = yield take(
    invoicesActions.getListInvoices.type
  ); // Action type
  const response: AxiosResponse<any> = yield call(
    invoiceService.getListInvoices,
    action.payload.limit,
    action.payload.userId
  );
  yield put(invoicesActions.getListInvoicesSuccess(response.data.results));
}

export default function* invoicesSaga() {
  yield takeEvery(
    invoicesActions.getListInvoices.type.toString(),
    getListInvoices
  );
}
