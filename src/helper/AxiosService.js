import axios from 'axios';
import store from './../store/configureStore';
import { AUTHENTICATE } from '../constant/auth';

const getCookie = (name) => {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix); // document.cookie.indexOf(';', 'token='); // 197
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else {
    begin += 2; // 199
    var end = dc.indexOf(";", begin); // -1
    if (end == -1) {
      end = dc.length; // 338
    }
  }
  // return decodeURI(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring((dc.indexOf(prefix) + prefix.length), dc.lastIndexOf(';', prefix)))
}
const gettoken = () => {
  let token = getCookie('token');
  if (token == null) {
    return token = ''
  } else {
    return token
  }
}

const token = gettoken();
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_GLOBAL || process.env.REACT_APP_API_LOCAL
    }`,
  // baseURL: `${process.env.REACT_APP_API_LOCAL}`,
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
});

instance.interceptors.request.use((req) => {
  const { authReducer } = store.getState();
  if (authReducer.token) {
    req.headers.Authorization = `Bearer ${authReducer.token}`;
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
      document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      store.dispatch({
        type: AUTHENTICATE.LOGOUT_SUCCESS,
      });
    }
    return Promise.reject(error);
  },
);

export default instance;
