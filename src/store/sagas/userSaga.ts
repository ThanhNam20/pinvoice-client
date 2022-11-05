import { AxiosResponse } from "axios";
import { call, put, take, takeLatest, fork, takeEvery } from "redux-saga/effects";
import { GetUserDto } from "store/slices/userSlice";
import { userService } from "../../services/user.service";
import { userActions } from "../slices/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* getUserInfo() {
  const action: PayloadAction<GetUserDto> = yield take(
    userActions.getUserInfo.type
  );
  const response: AxiosResponse<any> = yield call(
    userService.getUserInfo,
    action.payload
  );
  yield put(userActions.getUserInfoSuccess(response.data));
}

export default function* authSaga() {
  yield takeEvery(userActions.getUserInfo.type, getUserInfo);
}
