import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { TASK_ROUTE } from './constant/route';
import './core/css/style.scss';
import LayoutRoute from './Layout';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {TASK_ROUTE.map((item, index) => {
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
