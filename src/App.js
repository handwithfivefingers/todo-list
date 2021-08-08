import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchListTask } from './actions/task';
import './App.css';
import ModalForm from './components/Layout/UI/Modal/ModalForm';
import { TASK_ROUTE } from './constant/route';
import NotFound from './containers/404';
import './assets/css/style.scss';
import LayoutRoute from './Layout';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListTask());
  }, []);
  return (
    <div className="App">
      <ModalForm />
      <Router>
        <Switch>
          {TASK_ROUTE.map((item) => {
            return (
              <LayoutRoute
                key={item.path}
                path={item.path}
                component={item.component}
                exact={item.exact}
                name={item.name}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
