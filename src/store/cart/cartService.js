import axios from 'axios';

import { BASE_URL, CONFIG } from '../../config/axiosConfig';

const add = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/api/cart/add`,
    data,
    CONFIG(data.token)
  );

  if (response.data) {
    return response.data;
  }
};

const get = async (token) => {
  const response = await axios.get(`${BASE_URL}/api/cart/`, CONFIG(token));

  if (response.data) {
    return response.data;
  }
};

const deleteCart = async (data) => {
  const response = await axios.delete(
    `${BASE_URL}/api/cart/delete/${data.cartId}`,
    CONFIG(data.token)
  );

  if (response.data) {
    return response.data;
  }
};

export const cartService = {
  add,
  get,
  deleteCart,
};
