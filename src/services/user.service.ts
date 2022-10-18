import axios from "axios";
import { GetUserDto } from "store/slices/userSlice";
import querystring from 'querystring';
import { UpdateUserProps } from "components/Modal.component";

const getUserInfo = (userId: GetUserDto): any => {
  const config = {
    url: `v1/users/${userId}`,
    method: "get",
  };
  return axios(config);
};

const updateUserInfo = (userId: string, userInfo: UpdateUserProps): any => {
  const config = {
    url: `v1/users/${userId}`,
    method: "post",
    data: querystring.stringify({
      ...userInfo,
    }),
  };
  return axios(config);
};

export const userService = {
  getUserInfo,
  updateUserInfo
}
