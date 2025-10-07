import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductError: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    setProducts: (state, action) => {
      state.items = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = parseInt(action.payload.currentPage);
      state.loading = false;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.items.push(action.payload);
    },
    updateProductSuccess: (state, action) => {
      const index = state.items.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProductSuccess: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload.id);
    },
  },
});

export const { setProductLoading, setProductError, setProducts, addProductSuccess, updateProductSuccess, deleteProductSuccess } = productSlice.actions;
export default productSlice.reducer;