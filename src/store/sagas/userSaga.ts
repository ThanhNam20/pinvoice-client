import { AxiosResponse } from "axios";
import { call, put, take, takeLatest, fork } from "redux-saga/effects";
import { GetUserDto } from "store/slices/userSlice";
import { userService } from '../../services/user.service';
import { userActions } from '../slices/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';


function* getUserInfo(payload: GetUserDto) {
  const response: AxiosResponse <any> = yield call(userService.getUserInfo(payload));
  console.log(response);
  // yield put(userActions.getUserInfoSuccess(response.))
}

function* watchUserFlow() {
  // getAction Payload
  const action: PayloadAction<GetUserDto> = yield take(userActions.getUserInfo.type);
  console.log(action);
  // yield fork(getUserInfo, action.payload);
}


export default function* authSaga() {
  console.log("Auth Saga");
  yield fork(watchUserFlow);
}