import ReactDOM from 'react-dom';

// 创建容器
export function getContainer(ID = '__notification_container__') {
  const container = document.querySelector(`#${ID}`);
  if (container) return container;
  const newContainer = document.createElement('div');
  newContainer.id = ID;
  document.body.appendChild(newContainer);
  return newContainer;
}

export function delay(time) {
  return new Promise(resolve => setTimeout(() => resolve(), time * 1000));
}

/**
 * @param {element} 要移除的容易
 */
export function removeDom(ele) {
  const { parentNode } = ele;
  parentNode.removeChild(ele);
  parentNode.parentNode.removeChild(parentNode);
}

/**
 * @param {compoentn} Component || function
 * @param {*} id string
 */
export const mountComponent = (component, id = 'TW_UI_common') => {
  const parent = document.getElementById('__wrapComponent__' + id);
  if (parent) {
    const div = document.createElement('div');
    parent.appendChild(div);
  }
  if (!parent || !parent.children || !parent.children[0]) {
    const __wrapComponent__ = document.createElement('span');
    const div = document.createElement('div');
    __wrapComponent__.appendChild(div);
    __wrapComponent__.id = '__wrapComponent__' + id;
    document.getElementsByTagName('body')[0].appendChild(__wrapComponent__);
  }
  const mountNode = document.getElementById('__wrapComponent__' + id);
  ReactDOM.render(
    typeof component === 'function' ? component() : component,
    mountNode.children[mountNode.children.length - 1]
  );
};
