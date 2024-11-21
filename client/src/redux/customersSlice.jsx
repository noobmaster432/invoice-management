import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "customers",
  initialState: [],
  reducers: {
    setCustomers: (state, action) => {
      return action.payload;
    },
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex((customer) => customer.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    removeCustomer: (state, action) => {
      return state.filter((customer) => customer.id !== action.payload.id);
    },
  },
});

export const { addCustomer, updateCustomer, removeCustomer, setCustomers } = customersSlice.actions;
export default customersSlice.reducer;
