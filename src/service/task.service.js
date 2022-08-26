import axios from './../helper/AxiosService';

const api_path = {
  getAll: '/task',
  update: '/task',
};

const TaskService = {
  getAll: (params) => axios.post(api_path.getAll, params),
  update: ({ _id, ...params }) =>  axios.post(`${api_path.getAll}/${_id}`, params),
};

export default TaskService;
