import { Invoice } from 'types/Invoice';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export interface InvoiceState {
  listInvoices: Invoice[];
}

export interface GetUserDto {
  userId: string;
}

const initialState: InvoiceState = {
  listInvoices: [],
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: initialState,
  reducers: {
    getListInvoices(state, action: PayloadAction<any>) {
      state.listInvoices = [];
    },
    getListInvoicesSuccess(state, action: PayloadAction<Invoice[]>) {
      state.listInvoices = action.payload;
    },
    updateListInvoices(state, action: PayloadAction<Invoice[]>) {
      state.listInvoices = action.payload;
    },
  },
});
// Actions
export const invoicesActions = invoiceSlice.actions;
// Selectors

export const invoicesSelector = (state: RootState) => state.invoices;

//Reducers

const invoicesReducer = invoiceSlice.reducer;
export default invoicesReducer;
