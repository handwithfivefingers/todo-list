import Home from './../containers/Home';
import Task from './../containers/Task';
export const TASK_ROUTE = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
  },
];
