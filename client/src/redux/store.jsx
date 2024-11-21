import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "./invoiceSlice";
import productsReducer from "./productSlice";
import customersReducer from "./customersSlice";

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
  },
});

export default store;
