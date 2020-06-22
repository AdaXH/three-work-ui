import React from 'react';
import ReactDOM from 'react-dom';
import Components from '@/config/componentConfig';
import setIcon from '@/config/iconConfig';
import './index.css';
console.log('Components', Components);

const { config } = Components;
const target = url =>
  config.find(item => item.path.replace('/', '') === url).component;

const App = props => {
  window.onload = () => {
    setIcon();
  };
  return <div className="componentContainer">{target('tabs')()}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
