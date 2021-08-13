import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isUserLogIn } from './actions/auth';
import { fetchListTask } from './actions/task';
import './App.css';
import './assets/css/style.scss';
import { TASK_ROUTE } from './constant/route';
import NotFound from './containers/404';
import LayoutRoute from './Layout';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListTask());
    dispatch(isUserLogIn())
  }, []);
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
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
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
