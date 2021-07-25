import NotFound from '../containers/404';
import Login from '../containers/Login';
import Home from './../containers/Home';
import Project from './../containers/Project';
import TaskBoard from './../containers/TaskBoard';

export const TASK_SIDE = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];
export const TASK_ROUTE = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/project/:slug',
    name: 'Project',
    component: TaskBoard,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
  },
];
