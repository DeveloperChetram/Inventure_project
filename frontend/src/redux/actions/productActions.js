import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// READ (already exists)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, search = '' }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products?page=${page}&search=${search}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not fetch products.');
    }
  }
);

// CREATE
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not add product.');
    }
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not update product.');
    }
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id; // Return the id to identify which product to remove from the state
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not delete product.');
    }
  }
);