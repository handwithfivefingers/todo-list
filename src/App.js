import { Layout, Spin, Button, notification } from 'antd';

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

import { fetchToken, onMessageListener } from './configs/firebase';

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

  const [show, setShow] = useState(false);

  const [isTokenFound, setTokenFound] = useState(false);

  const [noti, setNoti] = useState({
    message: null,
    description: null,
  });

  useEffect(() => {
    let { message, description } = noti;
    if (show && (message || description)) {
      notification.open({
        message: noti.message,
        description: noti.description,
        duration: 0,
      });
      setShow(false);
      setNoti({
        message: null,
        description: null,
      });
    }
  }, [show, noti]);

  fetchToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      setNoti({
        message: payload.notification.title,
        description: payload.notification.body,
      });
      setShow(true);
      // console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  const onShowNotificationClicked = () => {
    setShow(true);
  };

  useEffect(() => {
    setAuth(authHook.isLogin);
  }, [authHook]);

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        {/* {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <Button onClick={() => onShowNotificationClicked()}>Show Toast</Button> */}
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
                <RouterComp auth={auth} />
              </Spin>
            </ContentLayout>
          </Router>
        </AuthProvider>
      </Layout>
    </div>
  );
}

export default App;
