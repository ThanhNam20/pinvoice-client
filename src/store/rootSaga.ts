import {all} from 'redux-saga/effects';
import invoicesSaga from './sagas/invoiceSaga';
import productsSaga from './sagas/productSaga';
import authSaga from './sagas/userSaga';

export default function* rootSaga() {
  console.log("Init rootSaga");
  yield all([authSaga(), productsSaga(), invoicesSaga()]);
} 
