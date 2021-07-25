import axios from 'axios';
const instance = axios.create({
  baseURL: `${
    process.env.REACT_APP_API_GLOBAL || process.env.REACT_APP_API_LOCAL
  }`,
  // baseURL: `${process.env.REACT_APP_API_LOCAL}`,
});
export default instance;
