import axios from 'axios';
import store from './../store/configureStore';
import { AUTHENTICATE } from '../constant/auth';
import { userLogout } from '../actions/auth';
// const getCookie = (name) => {
//   var dc = document.cookie;
//   var prefix = name + "=";
//   var begin = dc.indexOf("; " + prefix); // document.cookie.indexOf(';', 'token='); // 197
//   if (begin === -1) {
//     // Không có tên cookie cần tìm
//     begin = dc.indexOf(prefix);
//     if (begin !== 0) return null;
//   }
//   else {
//     // Xác định độ dài cookie
//     begin += 2; // 199
//     // check chuỗi cookie kết thúc = dấu ;
//     var end = dc.indexOf(";", begin); // -1
//     if (end === -1) {
//       end = dc.length; // 338
//     }
//   }
//   // return decodeURI(dc.substring(begin + prefix.length, end));
//   return decodeURI(dc.substring((dc.indexOf(prefix) + prefix.length), dc.lastIndexOf(';', prefix)))
// }
const getCookie = (name) => {
  const dc = document.cookie;
  const prefix = name + '=';
  let newtoken = null
  if (dc.split('; ').length > 0) {
    dc.split('; ').some(item => {
      if (item.includes(prefix)) {
        newtoken = item
      }
    });
  }
  if (newtoken !== null) {
    return newtoken.split(prefix)[1]
  } else {
    return newtoken
  }
}
const gettoken = () => {
  let token = getCookie('token');
  if (token === null) {
    return token = ''
  } else {
    return token
  }
}

const token = getCookie('token') !== null ? getCookie('token') : '';
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
      // document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      // store.dispatch({
      //   type: AUTHENTICATE.LOGOUT_SUCCESS,
      // });
      userLogout();
    }
    return Promise.reject(error);
  },
);

export default instance;
