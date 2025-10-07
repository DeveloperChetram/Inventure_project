import api from '../../api/api';
import { loginSuccess, logout, setAuthLoading, setAuthError } from '../slices/authSlice';

export const registerUser = async (credentials) => {
    try {
        await api.post('/auth/register', credentials);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
};

export const loginUser = async (credentials, dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const response = await api.post('/auth/login', credentials);
    dispatch(loginSuccess({ token: response.data.token }));
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    dispatch(setAuthError(message));
  }
};

export const logoutUser = (dispatch) => {
    dispatch(logout());
};