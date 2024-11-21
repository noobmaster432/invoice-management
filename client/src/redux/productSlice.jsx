import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex((product) => product.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
});

export const { addProduct, updateProduct, removeProduct, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
