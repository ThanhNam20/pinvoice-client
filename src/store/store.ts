import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import invoicesReducer from "./slices/invoiceSlice";
import productsReducer from "./slices/productSlice";
import userReducer from './slices/userSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    invoices: invoicesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
