import axios from "axios";
import { GetUserDto } from "store/slices/userSlice";

const getUserInfo = (userId: GetUserDto): any => {
  const config = {
    url: `v1/users/${userId}`,
    method: "get",
  };
  return axios(config);
};

export const userService = {
  getUserInfo
}
