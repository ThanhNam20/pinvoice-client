import { LOCALSTORAGE_KEY } from "contants/message";

const setItem = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

const getItem = (key: string): any => {
  return localStorage.getItem(key);
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

const removeAll = () => {
  localStorage.clear();
};

export const localStorageService = {
  setItem,
  getItem,
  removeItem,
  removeAll,
};
