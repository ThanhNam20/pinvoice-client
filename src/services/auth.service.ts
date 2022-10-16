import axios from "axios";
import { LoginDto } from "types/LoginDto";
import { RegisterDto } from "types/RegisterDto";
import { localStorageService } from "./localstorage.service";

const login = (loginDto: LoginDto) => {
  const config = {
    url: `v1/auth/login`,
    method: "post",
    data: {
      ...loginDto,
    },
  };
  return axios(config);
};

const register = (registerDto: RegisterDto) => {
  const config = {
    url: `v1/auth/login`,
    method: "post",
    data: {
      ...registerDto,
    },
  };
  return axios(config);
};

const logout = () => {
  localStorageService.removeAll();
};

export const authService = {
  logout,
  login,
  register,
};
