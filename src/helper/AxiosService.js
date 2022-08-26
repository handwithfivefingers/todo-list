import axios from 'axios';

const instance = axios.create({
  baseURL: `${
    process.env.NODE_ENV !== 'development'
      ? process.env.REACT_APP_API_GLOBAL
      : process.env.REACT_APP_API_LOCAL
  }`,
  timeout: 1000 * 30, // Wait for 30 seconds
  headers: {
    'Access-Control-Allow-Origin': '*',
    accept: 'application/json',
  },
  withCredentials: true,
  credentials: 'include',
});

instance.interceptors.request.use((req) => {
  return req;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // status 500 ...
    const status = error.response ? error.response.status : 500;
    if (status === 500) {
    }
    return Promise.reject(error);
  }
);

export default instance;
