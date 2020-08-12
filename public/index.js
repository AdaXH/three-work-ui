import React from 'react';
import ReactDOM from 'react-dom';
import Components from '@/config/componentConfig';
import setIcon from '@/config/iconConfig';
// import { Notification } from '../lib/main';
import Notification from '../src/component/Notification/Notification';

import './index.css';
console.log('Components', Components);

const { config } = Components;
const target = (url) =>
  config.find((item) => item.path.replace('/', '') === url).component;

const App = (props) => {
  console.log('Notification', Notification);
  return (
    <div className="componentContainer">
      <a
        onClick={() => {
          Notification.success();
        }}
      >
        test
      </a>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
