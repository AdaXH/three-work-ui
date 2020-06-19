import React from 'react';
import './index.css';
const component = () => {
  return (
    <div className="container">
      <h1>three-work-ui</h1>
      <div className="logo">
        <i className="icon-uicn iconfont" />
        <div className="tw_ui">tw</div>
      </div>
      <div className="TW_UI_detail">
        <div>一个瞎捣鼓的UI组件库，一切以娱乐为主，封装为辅</div>
        <div>哈哈哈哈哈哈哈哈哈......</div>
      </div>
      <a
        href="https://github.com/AdaXH/three-work-ui"
        target="blank"
        className="TW_UI_github"
      >
        <i className="icon-github iconfont" />
        <span>Github</span>
      </a>
    </div>
  );
};

const ButtonComponent = {
  path: '/twui',
  component,
  name: 'twui介绍',
};

export default ButtonComponent;
