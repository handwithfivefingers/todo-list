import { AUTHENTICATE } from './../constant/auth';
import { message } from 'antd';
import axios from './../helper/AxiosService';
import jwt_decode from 'jwt-decode';

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

export const LoginUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    });
    // const res = await 
    
    axios.post('/signin', form)
      .then(res => {
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
      })
      .catch(err => {
        console.log(err.response.data.message);
        let res = err.response.data
        dispatch({
          type: AUTHENTICATE.LOGIN_FAILURE,
          payload: {
            message: res.message,
          }
        });
        message.error(err.response.data.message)
      })
  };
};
export const RegisterUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.REGISTER_REQUEST,
    });
    axios.post('/signup', form)
      .then(res => {
        const { token, user } = res.data;
        document.cookie = "token=" + token;
        document.cookie = "user=" + JSON.stringify(user);
        dispatch({
          type: AUTHENTICATE.REGISTER_SUCCESS,
          payload: {
            token, user
          },
        });
        message.success('Đăng kí tài khoản thành công !');
      })
      .catch(err => {
        dispatch({
          type: AUTHENTICATE.REGISTER_FAILURE,
          payload: {
            message: err.response.data.message,
          },
        });
        message.error(err.response.data.message);
      })
  };
};

export const isUserLogIn = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST
    })

    const token = getCookie('token') !== null ? getCookie('token') : '';
    if (token) {
      const res = await axios.post('/auth/required');
      if (res.status === 200) {
        const user = JSON.parse(getCookie('user'));
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
      document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      dispatch({
        type: AUTHENTICATE.LOGOUT_SUCCESS,
      })
    }
  }
}