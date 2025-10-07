import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../actions/productActions';

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
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
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
      })
      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new product to the list
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // Update the product in the list
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload); // Remove the product
      });
  },
});

export default productSlice.reducer;