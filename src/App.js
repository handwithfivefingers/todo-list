import { Layout, Spin } from 'antd';

import { useState, useEffect, cloneElement } from 'react';

import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
} from 'react-router-dom';

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

import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const RouterComp = ({ auth }) => {
  let location = useLocation();

  const routerComp = useRoutes(ROUTER(auth));

  if (!routerComp) return null;

  return (
    <AnimatePresence mode="sync" initial={false}>
      {cloneElement(routerComp, { key: location.pathname })}
    </AnimatePresence>
  );
};

function App(props) {
  const [auth, setAuth] = useState(false);
  const authHook = useAuthenticate();

  useEffect(() => {
    setAuth(authHook.isLogin);
  }, [authHook]);

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
              {/* <Spin spinning={authHook.loading}> */}
                <RouterComp auth={auth} />
              {/* </Spin> */}
            </ContentLayout>
          </Router>
        </AuthProvider>
      </Layout>
    </div>
  );
}

export default App;
