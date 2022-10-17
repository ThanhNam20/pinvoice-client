import {all} from 'redux-saga/effects';
import authSaga from './sagas/userSaga';

export default function* rootSaga() {
  console.log("Init rootSaga")
  yield all([authSaga()])
} 
