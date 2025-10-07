import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

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