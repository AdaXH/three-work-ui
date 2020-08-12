import React from 'react';
import ReactDOM from 'react-dom';
import Components from '@/config/componentConfig';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from 'react-router-dom';
import setIcon from '@/config/iconConfig';
import './App.css';

const App = (props) => {
  window.onload = () => {
    setIcon();
  };
  return (
    <div className="componentContainer">
      <Router>
        <span style={{ display: 'flex' }}>
          <div className="componentList">
            {Components.config.map((item) => (
              <NavLink to={item.path} key={item.name}>
                {item.name}
                <span className="TW_UI_author">@ {item.author}</span>
              </NavLink>
            ))}
          </div>
          <Switch>
            {Components.config.map((item) => (
              <Route
                key={item.name}
                className="__componentDetail"
                path={item.path}
                component={() => (
                  <div className="rightComponent">{item.component()}</div>
                )}
              />
            ))}
            <Redirect to="/button" />
          </Switch>
        </span>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
