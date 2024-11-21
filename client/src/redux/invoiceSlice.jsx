import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    setInvoices: (state, action) => {
      return action.payload;
    },
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addInvoice, setInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer;
