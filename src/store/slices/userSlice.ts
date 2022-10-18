import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IUser } from "types/User";

export interface UserState {
  isAuthenticated: boolean;
  currentUser: IUser | null;
}

export interface GetUserDto {
  userId: string
}

const initialState: UserState = {
  isAuthenticated: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserInfo(state, action: PayloadAction<GetUserDto>) {
      state.isAuthenticated = false;
    },
    getUserInfoSuccess(state, action: PayloadAction<IUser>) {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    getUserInfoSuccessWithNoAuthentication(state, action: PayloadAction<IUser>) {
      state.isAuthenticated = false;
      state.currentUser = action.payload;
    },
    getUserInfoFailed(state) {
      state.isAuthenticated = false;
    },
    removeUserInfo(state) {
      state.currentUser = null;
      state.isAuthenticated = false
    }
  },
});
// Actions
export const userActions = userSlice.actions;
// Selectors

export const userSelector = (state: RootState) => state.user;

//Reducers

const userReducer = userSlice.reducer;
export default userReducer;
