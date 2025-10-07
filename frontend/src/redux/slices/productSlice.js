import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/productActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = parseInt(action.payload.currentPage);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;