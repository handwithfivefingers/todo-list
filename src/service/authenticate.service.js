import axios from './../helper/AxiosService';

const api_path = {
  login: '/signin',
  logout: '',
  register: '/signup',
  authenticate: '/auth/required',
};

const AuthenticateService = {
  Login: (params) => axios.post(api_path.login, params),
  Logout: (params) => axios.post(api_path.logout, params),
  Register: (params) => axios.post(api_path.register, params),
  Authenticate: (params) => axios.post(api_path.authenticate, params),
};

export default AuthenticateService;
