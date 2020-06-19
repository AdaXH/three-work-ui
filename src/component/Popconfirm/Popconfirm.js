import React, { useState, useRef } from 'react';
import { useDidMount } from '@/util/hooks';
import { delay, removeDom, mountComponent } from '@/util/module';

export default props => {
  return (
    <div>
      <div
        className="TW_UI_popConfirmChildren"
        onClick={e => openPopconfirmContainer(e, props)}
      >
        {props.children || ''}
      </div>
    </div>
  );
};

const openPopconfirmContainer = (e, props) => {
  e.stopPropagation();
  e.preventDefault();
  const left = e.clientX;
  const top = e.clientY;
  const MAX_TOP = 110;
  const MAX_LEFT = 40;
  const styles = { left: left - MAX_LEFT + 'px', top: top - MAX_TOP + 'px' };
  const {
    title = 'popconfirm title',
    cancelText = 'cancel',
    okText = 'ok',
    onCancel,
    onConfirm,
  } = props;

  const WrapCom = () => {
    const [show, setShow] = useState(false);
    useDidMount(async () => {
      await setShow(true);
      await delay(0.01);
    });
    const ref = useRef(null);
    const className = show ? 'TW_UI_popconfirmShow' : 'TW_UI_popconfirmHide';
    const handleClick = async type => {
      if (type === 'close') {
        if (onCancel) {
          await onCancel();
        }
      } else {
        if (onConfirm) {
          await onConfirm();
        }
      }
      await setShow(false);
      await delay(0.3);
      removeDom(ref.current);
    };
    return (
      <div ref={ref}>
        <div
          className="TW_UI_popconfirmMask"
          onClick={() => handleClick('close')}
        />
        <div
          className={'TW_UI_popconfirmContainer ' + className}
          style={{ ...styles }}
        >
          <div className="_TW_UI_popconfirmContext">
            <span className="TW_UI_popconfirmIcon">
              <i className="icon-yiwen iconfont" />
            </span>
            {title}
          </div>
          <div className="TW_UI_popconfirmFooter">
            <span onClick={() => handleClick('close')}>{cancelText}</span>
            <span onClick={() => handleClick('submit')}>{okText}</span>
          </div>
        </div>
      </div>
    );
  };
  mountComponent(<WrapCom />, 'tw-ui-popconfirm');
};
