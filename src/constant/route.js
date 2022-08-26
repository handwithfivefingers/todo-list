import { Navigate, Outlet } from 'react-router-dom';
import NotFound from '../containers/404';
import Login from '../containers/Login';
import Profile from '../containers/Profile';
import Register from '../containers/Register';
import Home from './../containers/Home';
import Project from './../containers/Project';
import TaskBoard from './../containers/TaskBoard';
export const TASK_ROUTE = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/project/:slug',
    name: 'Taskboard',
    component: TaskBoard,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

export default (status) => [
  {
    title: 'Trang chủ',
    path: '',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'project',
        element: !status && <Navigate to="/login" /> || <Outlet />,
        children: [
          {
            index: true,
            element: <Project />,
          },
          {
            path: ':slug',
            element: <TaskBoard />,
          },
        ],
      },
      {
        path: 'login',
        element: status && <Navigate to="/" /> || <Login />,
      },
      {
        path: 'register',
        element: status && <Navigate to="/" /> || <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
