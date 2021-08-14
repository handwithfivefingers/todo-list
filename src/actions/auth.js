import { AUTHENTICATE } from './../constant/auth';
import axios from './../helper/AxiosService';
export const LoginUser = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST,
    });
    const res = await axios.post('/signin', form);
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: AUTHENTICATE.LOGIN_SUCCESS,
        payload: {
          token, user,
        },
      });
    } else {
      dispatch({
        type: AUTHENTICATE.LOGIN_FAILURE,
        payload: {
          message: res.data,
        },
      });
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
      const { message } = res.data;
      dispatch({
        type: AUTHENTICATE.REGISTER_SUCCESS,
        payload: {
          data: res.data,
        },
      });
    } else {
      dispatch({
        type: AUTHENTICATE.REGISTER_FAILURE,
        payload: {
          message: res.data,
        },
      });
    }
  };
};

export const isUserLogIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    // if (token) {
    //   const user = JSON.parse(localStorage.getItem('user'));
    //   dispatch({
    //     type: AUTHENTICATE.LOGIN_SUCCESS,
    //     payload: {
    //       token,
    //       user,
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: AUTHENTICATE.LOGIN_FAILURE,
    //     payload: {
    //       error: 'Fail to login',
    //     },
    //   });
    // }
    dispatch({
      type: AUTHENTICATE.LOGIN_REQUEST
    })
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('/auth/required');
      console.log('res', res);
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
          type: AUTHENTICATE.LOGOUT_SUCCESS
        })
      }
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
      localStorage.clear();
      dispatch({
        type: AUTHENTICATE.LOGOUT_SUCCESS,
      })
    }
  }
}