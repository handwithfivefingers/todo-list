import { Layout, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isUserLogIn } from './actions/auth';
import './App.css';
import './assets/css/style.scss';
import { TASK_ROUTE } from './constant/route';
import NotFound from './containers/404';
import LayoutRoute from './Layout';
import ContentLayout from './components/Layout/Content';
import SiderLayout from './components/Layout/Sidebar';
import { compose } from 'redux';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLogIn());
  }, []);

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <Router>
          <SiderLayout />

          <Switch>
            <ContentLayout>
              <Spin spinning={props?.authReducer.authenticating}>
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
              </Spin>
            </ContentLayout>

            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}
const mapStatetoProps = ({ authReducer }) => ({
  authReducer,
});

const mapDispatchtoProps = null;

const withConenct = connect(mapStatetoProps, mapDispatchtoProps);
export default compose(withConenct)(App);
