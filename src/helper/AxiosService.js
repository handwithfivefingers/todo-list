import axios from 'axios';
import store from './../store/configureStore';
import { AUTHENTICATE } from '../constant/auth';
const token = window.localStorage.getItem('token');

const instance = axios.create({
  // baseURL: `${
  //   process.env.REACT_APP_API_GLOBAL || process.env.REACT_APP_API_LOCAL
  // }`,
  baseURL: `${process.env.REACT_APP_API_LOCAL}`,
  headers: {
    Authorization: token ? `Bear ${token}` : ''
  }
});

instance.interceptors.request.use((req) => {
  const { authReducer } = store.getState();
  if (authReducer.user.token) {
    req.headers.Authorization = `Bears ${authReducer.user.token}`;
  }

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
      localStorage.clear();
      store.dispatch({
        type: AUTHENTICATE.LOGOUT_SUCCESS,
      });
    }
    return Promise.reject(error);
  },
);

export default instance;
