import React, { useRef, useState } from 'react';
import { useDidMount } from '@/util/hooks';
import { delay, removeDom } from '@/util/module';
import { mapColor, mapIcon } from './constant';
import { positionStyle, createMountNode } from './util';
import './index.less';

const Notification = {};

const setInstance = () => {
  ['success', 'fail', 'warning', 'error'].forEach(_type_ => {
    const key = _type_;
    Notification[_type_] = args => Component(args, key);
  });
};

setInstance();

const Component = (props, _type_) => {
  const { position = 'right', msg = '通知', duration = 1 } = props;
  const WrapCom = props => {
    const [state, setState] = useState({ show: true });
    const ref = useRef(null);
    useDidMount(async () => {
      await delay(duration);
      await setState({ show: false });
      await delay(0.9);
      removeDom(ref.current);
    });
    const { show } = state;
    return (
      <div data-position={position} ref={ref}>
        <div className={'toast ' + positionStyle(position, show).toast}>
          <i
            style={{ color: mapColor[_type_] }}
            className={'status iconfont ' + mapIcon[_type_]}
          />
          <span>{msg}</span>
        </div>
      </div>
    );
  };
  createMountNode(<WrapCom />, position);
};

export default Notification;
