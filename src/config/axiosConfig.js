import store from './../store';

export const BASE_URL = 'http://localhost:9090';

export const CONFIG = (jwt) => {
  if (store)
    return {
      headers: {
        Authorization: `Bearer ${jwt !== null ? jwt : ''}`,
        Accept: 'application/json',
      },
    };
};
