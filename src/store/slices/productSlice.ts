import { IProduct } from "./../../types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IUser } from "types/User";

export interface ProductState {
  listProducts: IProduct[];
}

export interface GetUserDto {
  userId: string;
}

const initialState: ProductState = {
  listProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    getListProducts(state, action: PayloadAction<any>) {
      state.listProducts = [];
    },
    getListProductsSuccess(state, action: PayloadAction<IProduct[]>) {
      state.listProducts = action.payload;
    },
    updateListProducts(state, action: PayloadAction<IProduct[]>) {
      state.listProducts = action.payload;
    },
  },
});
// Actions
export const productsActions = productsSlice.actions;
// Selectors

export const productsSelector = (state: RootState) => state.products;

//Reducers

const productsReducer = productsSlice.reducer;
export default productsReducer;
