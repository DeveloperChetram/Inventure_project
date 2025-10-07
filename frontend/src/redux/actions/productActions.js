import api from '../../api/api';
import { setProducts, addProductSuccess, updateProductSuccess, deleteProductSuccess, setProductLoading, setProductError } from '../slices/productSlice';

export const fetchProducts = async (params, dispatch) => {
  dispatch(setProductLoading(true));
  try {
    const response = await api.get(`/products?page=${params.page}&search=${params.search}`);
    dispatch(setProducts(response.data));
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch products';
    dispatch(setProductError(message));
  }
};

export const addProduct = async (productData, dispatch) => {
  try {
    const response = await api.post('/products', productData);
    dispatch(addProductSuccess(response.data));
  } catch (error) {
    // Handle error...
  }
};

export const updateProduct = async (id, productData, dispatch) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    // Handle error...
  }
};

export const deleteProduct = async (id, dispatch) => {
    try {
        await api.delete(`/products/${id}`);
        dispatch(deleteProductSuccess({ id }));
    } catch (error) {
        // Handle error...
    }
};