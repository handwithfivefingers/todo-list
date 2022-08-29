import axios from './../helper/AxiosService';

const api_path = {
  getAll: '/task',
  create: '/task/create',
  update: '/task',
  delete: '/task',
};

const TaskService = {
  getAll: (params) => axios.post(api_path.getAll, params),

  create: (params) => axios.post(`${api_path.create}`, params),

  update: ({ _id, ...params }) =>
    axios.post(`${api_path.update}/${_id}`, params),

  delete: ({ _id }) => axios.delete(`${api_path.delete}/${_id}`),
};

export default TaskService;
