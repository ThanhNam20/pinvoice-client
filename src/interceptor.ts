import Axios from "axios";
import { localStorageService } from './services/localstorage.service';
import { LOCALSTORAGE_KEY, MESSAGE } from './contants/message';
import { authService } from './services/auth.service';

const interceptor = () => {
  Axios.interceptors.request.use(async (config: any) => {
    const token = localStorageService.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
    config.baseURL = process.env.REACT_APP_BASE_URL;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  Axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      if (error?.response?.status === 401) {
        const token = localStorageService.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
        authService.logout();
        const message = token ? MESSAGE.TOKEN_EXPIRED : MESSAGE.LOGIN_FIRST;
        console.log(message);
      } else {
        const message = error?.response?.data?.message || error;
        console.log(message);
      }
    }
  );
};

export default interceptor;
