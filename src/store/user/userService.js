import axios from 'axios';

import { BASE_URL } from '../../config/axiosConfig';

const register = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/auth/signup`, data);

  if (response.data) {
    return response.data;
  }
};

const login = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/auth/signin`, data);

  if (response.data) {
    return response.data;
  }
};

const logout = async () => {
  const response = await axios.get(`${BASE_URL}/api/auth/logout`);

  if (response.data) {
    return response.data;
  }
};

export const userService = {
  register,
  login,
  logout,
};
