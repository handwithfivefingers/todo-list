import { AUTHENTICATE } from './../constant/auth';
import { message } from 'antd';
import axios from './../helper/AxiosService';
import jwt_decode from 'jwt-decode';

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  }
  else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}

export const LoginUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    });
    const res = await axios.post('/signin', form);
    if (res.status === 200) {
      const { token, user } = res.data;

      document.cookie = "token=" + token;
      document.cookie = "user=" + JSON.stringify(user);
      // console.log(document.cookie);
      // localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: AUTHENTICATE.LOGIN_SUCCESS,
        payload: {
          token, user,
        },
      });
      message.success('Đăng nhập thành công!');
    } else {
      dispatch({
        type: AUTHENTICATE.LOGIN_FAILURE,
        payload: {
          message: res.data,
        },
      });
      message.error('Đăng nhập thất bại!');
    }
  };
};
export const RegisterUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.REGISTER_REQUEST,
    });
    const res = await axios.post('/signup', form);
    console.log(res);
    if (res.status === 201) {
      const { token, user } = res.data;
      const decode = jwt_decode(token);
      console.log(decode);
      // if (Date.now() >= exp * 1000) {
      //   return false;
      // }
      document.cookie = "token=" + token;
      document.cookie = "user=" + JSON.stringify(user);
      dispatch({
        type: AUTHENTICATE.REGISTER_SUCCESS,
        payload: {
          token, user
        },
      });
      message.success('Đăng kí tài khoản thành công !');
    } else {
      dispatch({
        type: AUTHENTICATE.REGISTER_FAILURE,
        payload: {
          message: res.data,
        },
      });
      message.error('Đăng kí tài khoản thất bại, vui lòng thử lại sau !');
    }
  };
};

export const isUserLogIn = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST
    })

    const gettoken = () => {
      let token = getCookie('token');
      if (token == null) {
        return token = ''
      } else {
        return token
      }
    }
    const token = gettoken();
    if (token) {
      const user = JSON.parse(getCookie('user'));
      const res = await axios.post('/auth/required');
      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATE.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        })
      } else {
        dispatch({
          type: AUTHENTICATE.LOGIN_FAILURE,
          payload: {
            message: res.data,
          },
        })
      }
    } else {
      dispatch({
        type: AUTHENTICATE.LOGIN_FAILURE,
        payload: {
          message: 'Something went errors',
        },
      })
    }
  };
}

export const userLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    })
    const res = await axios.post('/signout');
    if (res.status === 200) {
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      dispatch({
        type: AUTHENTICATE.LOGOUT_SUCCESS,
      })
    }
  }
}