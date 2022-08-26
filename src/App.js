import { Layout, Spin } from 'antd';

import { useState, useEffect } from 'react';

import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import ROUTER, { TASK_ROUTE } from './constant/route';

import NotFound from './containers/404';

import LayoutRoute from './Layout';

import ContentLayout from './components/Layout/Content';

import SiderLayout from './components/Layout/Sidebar';

import 'antd/dist/antd.css';

import './assets/css/style.scss';

import 'animate.css';

import { AuthProvider } from './helper/context/AuthContext';

import { useAuthenticate } from './helper/hook';
import Route from './constant/route';

const RouterComp = () => {
  const routerComp = useRoutes(ROUTER());

  return routerComp;
};

function App(props) {
  // const { isLogin, loading } = useAuthenticate();
  // console.log(isLogin, loading);
  const [auth, setAuth] = useState(false);

  const authHook = useAuthenticate();

  useEffect(() => {
    setAuth(authHook.isLogin);
  }, [authHook]);
  console.log(authHook);

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <AuthProvider
          value={{
            auth,
            setAuth,
          }}
        >
          <Router>
            <SiderLayout />
            <ContentLayout>
              <Spin spinning={authHook.loading}>
                <RouterComp />
              </Spin>
            </ContentLayout>
          </Router>
        </AuthProvider>
      </Layout>
    </div>
  );
}

export default App;
