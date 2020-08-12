import ReactDOM from 'react-dom';

export function positionStyle(position = 'right', show) {
  if (position === 'right' || typeof position !== 'string') {
    return {
      toast: show ? 'TW_UI_toastRightShow' : 'TW_UI_toastRightHide',
      toastContainer: 'TW_UI_toastRight',
    };
  }
  if (position === 'top') {
    return {
      toast: show ? 'TW_UI_toastTopShow' : 'TW_UI_toastTopHide',
      toastContainer: 'TW_UI_toastCenter',
    };
  }
  if (position === 'left') {
    return {
      toast: show ? 'TW_UI_toastLeftShow' : 'TW_UI_toastLeftHide',
      toastContainer: 'TW_UI_toastLeft',
    };
  }
}

export function createMountNode(Component, position = 'right') {
  let notificationContainer = document.getElementById(
    'TW_UI_notification_container_' + position
  );
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'TW_UI_notification_container_' + position;
    document.getElementsByTagName('body')[0].appendChild(notificationContainer);
  }
  const mountNode = document.createElement('div');
  mountNode.className = 'TW_UI_notification_mount_node';
  notificationContainer.appendChild(mountNode);
  notificationContainer.className =
    'toastContainer ' + positionStyle(position, true).toastContainer;
  const mounts = notificationContainer.getElementsByClassName(
    'TW_UI_notification_mount_node'
  );
  ReactDOM.render(Component, mounts[mounts.length - 1]);
}
